import { commands } from '@/bindings';
import { Nav } from '@/components/Nav';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { createBlamePlugin } from '@/extensions/Blame';
import { checkboxPlugin } from '@/extensions/BoolCheckbox';
import NOTIFY from '@/lib/notify';
import { useBlameInfo, useFiles } from '@/lib/query';
import { useAppState } from '@/lib/state';
import { BlameCard } from '@/stories/atoms/BlameCard';
import FilePanel from '@/stories/panels/FilePanel';
import * as Portal from '@radix-ui/react-portal';
import { createFileRoute } from '@tanstack/react-router';
import { Navigate } from '@tanstack/react-router';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useMemo, useRef, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { match } from 'ts-pattern';

export const Route = createFileRoute('/filetree/$commit')({
  component: FileTree,
});

function FileTree() {
  const { commit } = Route.useParams();

  const [repoPath] = useAppState(s => [s.repoPath]);
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

  const [path, setPath] = useState('');

  async function getText(path: string) {
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
        NOTIFY.error(err.error);
      });
  }

  const extensions = [];
  if (language) {
    // @ts-expect-error: no error
    extensions.push(loadLanguage(language));
  }

  const { error: blameErr, data: blameInfo } = useBlameInfo(commit, path);
  if (blameErr) {
    NOTIFY.error(blameErr.name);
  }
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

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex h-screen overflow-clip p-2"
      data-tauri-drag-region={true}
    >
      <ResizablePanel defaultSize={20} className="flex w-52 flex-col">
        <Nav to="/" text={<MdHome />} />
        <FilePanel files={tree} onClicked={getText} commit={commit} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="grow">
        <CodeMirror
          value={text}
          className="h-screen w-full font-mono text-base"
          height="100%"
          theme={mirrorTheme}
          // @ts-expect-error: no error
          extensions={[...extensions, checkboxPlugin, blamePlugin]}
        />
        <Portal.Root container={blameWidget.current} asChild>
          {hunk && <BlameCard blame={hunk} />}
        </Portal.Root>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
