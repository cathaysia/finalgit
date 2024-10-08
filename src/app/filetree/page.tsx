import { commands } from '@/bindings';
import { Nav } from '@/components/Nav';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import NOTIFY from '@/lib/notify';
import { useFiles } from '@/lib/query';
import { useAppState } from '@/lib/state';
import FilePanel from '@/stories/panels/FilePanel';
import { createFileRoute } from '@tanstack/react-router';
import { Navigate } from '@tanstack/react-router';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { MdHome } from 'react-icons/md';
import { match } from 'ts-pattern';

export const Route = createFileRoute('/filetree/')({
  component: FileTree,
});

function FileTree() {
  const [repoPath, current] = useAppState(s => [s.repoPath, s.current]);
  const { error: fileErr, data: files } = useFiles();
  if (fileErr) {
    NOTIFY.error(fileErr.message);
  }
  const tree = files || [];
  if (tree.length === 0) {
    <Navigate to="/" />;
  }
  const [text, setText] = useState<string>();
  const { theme } = useTheme();
  const [language, setLanguage] = useState<string>();
  const mirrorTheme = theme === 'dark' ? githubDark : githubLight;

  async function getText(path: string) {
    if (!current || !repoPath) {
      return;
    }
    const normalPath = path.slice(1);
    const language = await commands.assumeLanguage(normalPath);
    match(language).with({ status: 'ok' }, val => {
      if (val.data) {
        setLanguage(val.data);
      }
    });

    const content = await commands?.getFileContent(
      repoPath,
      current,
      normalPath,
    );
    match(content)
      .with({ status: 'ok' }, val => {
        setText(val.data);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  const extensions = [];
  if (language) {
    // @ts-expect-error: no error
    extensions.push(loadLanguage(language));
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex h-screen overflow-clip p-2"
      data-tauri-drag-region={true}
    >
      <ResizablePanel defaultSize={20} className="flex w-52 flex-col">
        <Nav to="/" text={<MdHome />} />
        <FilePanel files={tree} onClicked={getText} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="grow">
        <CodeMirror
          value={text}
          className="h-screen w-full font-mono text-base"
          height="100%"
          theme={mirrorTheme}
          readOnly
          // @ts-expect-error: no error
          extensions={extensions}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
