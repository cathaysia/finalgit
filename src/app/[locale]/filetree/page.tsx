'use client';

import { commands } from '@/bindings';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useBlameInfo, useFiles } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import { Link } from '@/i18n/routing';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { createBlamePlugin } from '@/ui/codemirror/blame';
import { BlameCard } from '@/ui/codemirror/blame/blame-card';
import {
  LicenseCard,
  detectLicense,
} from '@/ui/codemirror/license/license-card';
import FilePanel from '@/ui/panels/file-panel';
import * as Portal from '@radix-ui/react-portal';
import {
  type LanguageName,
  loadLanguage,
} from '@uiw/codemirror-extensions-langs';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { match } from 'ts-pattern';

export default function FileTree() {
  const params = useSearchParams();
  const commit = params.get('commit') || '';
  const theme = useTheme().resolvedTheme === 'light' ? githubLight : githubDark;

  const [repoPath] = useAppState(s => [s.repoPath]);
  const { data: files } = useFiles(commit);
  const tree = files || [];
  const [text, setText] = useState<string>();
  const [language, setLanguage] = useState<string>();

  const [path, setPath] = useState('');

  async function getText(path: string, noWarn = false) {
    if (!repoPath) {
      return;
    }
    const normalPath = path.slice(1);
    setPath(normalPath);
    const language = await commands.assumeLanguage(normalPath);
    match(language).with({ status: 'ok' }, val => {
      if (val.data) {
        setLanguage(val.data);
      }
    });

    const content = await commands?.fileGetContent(
      repoPath,
      commit,
      normalPath,
    );
    match(content)
      .with({ status: 'ok' }, val => {
        setText(val.data);
      })
      .with({ status: 'error' }, err => {
        if (noWarn) {
          return;
        }
        NOTIFY.error(`get file content failed: ${err.error}`);
      });
  }

  useEffect(() => {
    getText('/README.md', true);
  }, []);

  const extensions = [];
  if (language) {
    const lang = loadLanguage(language as LanguageName);
    if (lang) {
      extensions.push(lang);
    }
  }

  const { data: blameInfo } = useBlameInfo(commit, path);
  const [cursor, setCursor] = useState(0);
  const blameWidget = useRef<HTMLElement | undefined>(undefined);
  const hunk = blameInfo?.find(item => {
    return (
      item.final_start_line <= cursor &&
      item.final_start_line + item.lines > cursor
    );
  });

  const blamePlugin = useMemo(() => {
    return createBlamePlugin(blameWidget, cursor => {
      setCursor(cursor);
    });
  }, [path]);

  let license: string[] = [];
  if (text && path.toLowerCase().includes('license')) {
    license = detectLicense(text);
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex h-screen overflow-clip p-2"
      data-tauri-drag-region
    >
      <ResizablePanel defaultSize={20} className="flex w-52 flex-col">
        <Link
          href="/"
          className={cn(
            'flex h-9 w-full justify-center pt-2 text-center align-middle hover:bg-secondary/80',
          )}
        >
          <MdHome className="inline-block" />
        </Link>
        <FilePanel files={tree} onClicked={getText} commit={commit} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="flex h-screen flex-col overflow-y-hidden">
          <ResizablePanelGroup direction={'vertical'}>
            {license.length !== 0 && (
              <>
                <ResizablePanel defaultSize={25} className="overflow-y-visible">
                  <LicenseCard license={license} />
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}
            <ResizablePanel defaultSize={75}>
              {text ? (
                <CodeMirror
                  value={text}
                  className="font-mono text-base"
                  height="100vh"
                  theme={theme}
                  extensions={[
                    ...extensions,
                    blamePlugin,
                    EditorView.lineWrapping,
                  ]}
                />
              ) : (
                <div className="" />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Portal.Root container={blameWidget.current} asChild>
          {hunk && <BlameCard blame={hunk} />}
        </Portal.Root>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
