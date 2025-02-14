import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGitOpts } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import { setGitConfig } from '@/lib/git';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export interface GitOptionProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  opt: string;
}

export default function GitOption({
  className,
  id,
  name,
  opt,
  ...props
}: GitOptionProps) {
  const { data: gitOpt } = useGitOpts(opt);
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const [value, setValue] = useState<string>('');
  const [debounce] = useDebounce(value, 1000);

  useEffect(() => {
    if (gitOpt) {
      setValue(gitOpt);
    }
  }, [repoPath, gitOpt]);

  useEffect(() => {
    if (!debounce || !repoPath || !debounce) {
      return;
    }
    if (debounce.length === 0) {
      return;
    }
    setGitConfig(repoPath, opt, debounce);
  }, [debounce, repoPath, opt]);

  return (
    <div className={cn(className)} {...props}>
      <Label htmlFor={id}>{name}</Label>
      <Input
        type="text"
        value={value}
        id={id}
        autoCorrect="off"
        onChange={e => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
