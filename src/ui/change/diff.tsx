import { type FileStatus, commands } from '@/bindings';
import { useAppStore } from '@/hooks/use-store';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useMemo, useState } from 'react';
import { shadcnTheme } from '../codemirror/theme/shadcn';

export interface DiffProps {
  item: FileStatus;
}

export function Diff({ item: filePath }: DiffProps) {
  const isWt = GitFileStatus.isWt(filePath.status);

  const [repoPath] = useAppStore(s => [s.repoPath]);
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

    if (isWt) {
      commands?.diffStageFile(repoPath, filePath.path).then(s => {
        if (s.status === 'ok') {
          setDiff(s.data);
        } else {
          NOTIFY.error(s.error);
        }
      });
    } else {
      commands?.diffCache(repoPath, [filePath.path]).then(s => {
        if (s.status === 'ok') {
          setDiff(s.data);
        } else {
          NOTIFY.error(s.error);
        }
      });
    }
  }, [filePath, repoPath]);

  return (
    <CodeMirror
      className="font-mono text-base"
      theme={shadcnTheme}
      height="520px"
      readOnly={true}
      value={diff}
      extensions={[...extensions]}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
    />
  );
}
