import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppState } from '@/hooks/state';
import { getGitConfig, setGitConfig } from '@/lib/git';
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
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [value, setValue] = useState<string>('');
  const [debounce] = useDebounce(value, 1000);

  useEffect(() => {
    if (repoPath) {
      getGitConfig(repoPath, opt).then(val => {
        if (val) {
          setValue(val);
        }
      });
    }
  }, [repoPath, opt]);

  useEffect(() => {
    if (!debounce || !repoPath || !debounce) {
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
        onChange={e => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
