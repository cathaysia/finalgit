import { type FileStatus, commands } from '@/bindings';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useMemo, useState } from 'react';
import { shadcnTheme } from '../codemirror/theme/shadcn';

export interface DiffProps {
  item: FileStatus;
}

export function FilePreview({ item: filePath }: DiffProps) {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [content, setContent] = useState('');

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

    commands?.fileReadToString(repoPath, filePath.path).then(s => {
      if (s.status === 'ok') {
        const content = s.data
          .split(/\n/)
          .map(line => `+${line}`)
          .join('\n');
        setContent(
          `diff --git a/${filePath.path} a/${filePath.path}\n--- /dev/null\n+++ ${filePath.path}\n${content}`,
        );
      } else {
        NOTIFY.error(s.error);
      }
    });
  }, [filePath, repoPath]);

  return (
    <CodeMirror
      className="font-mono text-base"
      theme={shadcnTheme}
      height="520px"
      readOnly={true}
      value={content}
      extensions={[...extensions]}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
    />
  );
}
