'use client';

import * as wasm from '@/crates/filetype/pkg/filetype';

import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useBlameInfo, useFiles } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { createBlamePlugin } from '@/ui/codemirror/blame';
import { BlameCard } from '@/ui/codemirror/blame/blame-card';
import {
  LicenseCard,
  detectLicense,
} from '@/ui/codemirror/license/license-card';
import { shadcnTheme } from '@/ui/codemirror/theme/shadcn';
import FilePanel from '@/ui/panels/file-panel';
import * as Portal from '@radix-ui/react-portal';
import {
  type LanguageName,
  loadLanguage,
} from '@uiw/codemirror-extensions-langs';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaCode, FaRegEye } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';

export default function FileTree() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const commit = searchParams.get('commit') || '';
  const path = searchParams.get('path') || 'README.md';
  const doWarn = searchParams.get('doWarn') !== null;

  const [repoPath] = useAppStore(s => [s.repoPath]);
  const { data: files } = useFiles(commit);
  const tree = files || [];
  const [text, setText] = useState<string>();
  const [language, setLanguage] = useState<string | null>();
  const projectName = repoPath?.split('/').filter(Boolean).at(-1) ?? 'Project';
  const commitLabel = commit ? commit.slice(0, 7) : 'HEAD';
  const pathSegments = path.split('/').filter(Boolean);
  const languageLabel = language ?? 'Text';
  const [isLicensePreview, setIsLicensePreview] = useState(false);
  const hasToggledPreview = useRef(false);

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    (async () => {
      await wasm.default();
      const language = wasm.resolve(path);
      setLanguage(language || null);
      const res = await commands?.fileGetContent(repoPath, commit, path);
      if (res.status === 'ok') {
        setText(res.data);
      } else {
        if (doWarn) {
          NOTIFY.error(`get file content failed: ${res.error}`);
        }
      }
    })();
  }, [repoPath, path, commit]);

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
  const hasLicense = license.length !== 0;

  useEffect(() => {
    if (!hasLicense) {
      setIsLicensePreview(false);
      hasToggledPreview.current = false;
      return;
    }
    if (!hasToggledPreview.current) {
      setIsLicensePreview(true);
    }
  }, [hasLicense]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div
        className="relative flex items-center border-b px-3 py-2"
        data-tauri-drag-region
      >
        <div className="-translate-x-1/2 absolute left-1/2 font-medium text-sm">
          {projectName}@{commitLabel}
        </div>
        <Link
          href="/"
          className={cn(
            'ml-auto flex h-8 w-8 items-center justify-center rounded-md border text-center align-middle hover:bg-secondary/80',
          )}
        >
          <MdHome className="inline-block" />
        </Link>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex min-h-0 flex-1 overflow-clip p-2"
      >
        <ResizablePanel defaultSize={20} className="flex w-52 flex-col">
          <FilePanel
            files={tree}
            onClicked={path => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('path', path.slice(1));
              params.set('doWarn', '');
              router.push(`${pathName}?${params.toString()}`);
            }}
            commit={commit}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="flex min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-2 text-muted-foreground text-xs">
              <div className="flex flex-wrap items-center gap-1">
                <span>{projectName}</span>
                {pathSegments.map((segment, index) => (
                  <span
                    key={`${segment}-${index}`}
                    className="flex items-center"
                  >
                    <span className="px-1">/</span>
                    <span>{segment}</span>
                  </span>
                ))}
                {!pathSegments.length && <span>/</span>}
              </div>
              <div className="flex items-center gap-2">
                {hasLicense && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      hasToggledPreview.current = true;
                      setIsLicensePreview(current => !current);
                    }}
                    title={isLicensePreview ? 'Code' : 'Preview'}
                    aria-label={isLicensePreview ? 'Code' : 'Preview'}
                  >
                    {isLicensePreview ? <FaCode /> : <FaRegEye />}
                  </Button>
                )}
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              {hasLicense && isLicensePreview ? (
                <div className="h-full overflow-auto p-2">
                  <LicenseCard license={license} />
                </div>
              ) : text ? (
                <CodeMirror
                  value={text}
                  className="h-full font-mono text-base"
                  height="100%"
                  theme={shadcnTheme}
                  extensions={[
                    ...extensions,
                    blamePlugin,
                    EditorView.lineWrapping,
                  ]}
                />
              ) : (
                <div className="" />
              )}
            </div>
          </div>
          <Portal.Root container={blameWidget.current} asChild>
            {hunk && <BlameCard blame={hunk} />}
          </Portal.Root>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
