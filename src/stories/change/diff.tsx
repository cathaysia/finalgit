import { commands } from '@/bindings';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useEffect, useMemo, useState } from 'react';
import { shadcnTheme } from '../codemirror/theme/shadcn';

export interface DiffProps {
  filePath: string;
}

export function Diff({ filePath }: DiffProps) {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [diff, setDiff] = useState('');

  const extensions = useMemo(() => {
    const extensions = [];
    const lang = loadLanguage('diff');
    if (lang) {
      extensions.push(lang);
    }
    return extensions;
  }, []);

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    commands?.diffStageFile(repoPath, filePath).then(s => {
      if (s.status === 'ok') {
        setDiff(s.data);
      } else {
        NOTIFY.error(s.error);
      }
    });
  }, [filePath, repoPath]);

  return (
    <CodeMirror
      className="font-mono text-base"
      theme={shadcnTheme}
      height="100%"
      value={diff}
      extensions={[...extensions, EditorView.lineWrapping]}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
    />
  );
}
