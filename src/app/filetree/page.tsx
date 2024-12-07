'use client';

import { commands } from '@/bindings';
import { Nav } from '@/components/na';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useBlameInfo, useFiles } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { createBlamePlugin } from '@/stories/codemirror/blame';
import { BlameCard } from '@/stories/codemirror/blame/blame-card';
import {
  LicenseCard,
  detectLicense,
} from '@/stories/codemirror/license/license-card';
import FilePanel from '@/stories/panels/file-panel';
import * as Portal from '@radix-ui/react-portal';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
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

    const content = await commands?.getFileContent(
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
    // @ts-expect-error: no error
    extensions.push(loadLanguage(language));
  }

  const { data: blameInfo } = useBlameInfo(commit, path);
  const [cursor, setCursor] = useState(0);
  const blameWidget = useRef<HTMLElement | undefined>();
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
        <Nav to="/" text={<MdHome />} />
        <FilePanel files={tree} onClicked={getText} commit={commit} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="flex h-screen flex-col overflow-y-hidden">
          <LicenseCard license={license} />
          {text ? (
            <CodeMirror
              value={text}
              className="font-mono text-base"
              height="100vh"
              theme={theme}
              // @ts-expect-error: no error
              extensions={[...extensions, blamePlugin, EditorView.lineWrapping]}
            />
          ) : (
            <div className="" />
          )}
        </div>
        <Portal.Root container={blameWidget.current} asChild>
          {hunk && <BlameCard blame={hunk} />}
        </Portal.Root>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
