import { commands } from '@/bindings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NOTIFY from '@/lib/notify';
import { useAppState } from '@/lib/state';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
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
  const [value, setValue] = useState<string>();
  const [debounce] = useDebounce(value, 1000);

  useEffect(() => {
    if (repoPath) {
      getValue(repoPath, opt).then(val => {
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
    setConfig(repoPath, opt, debounce);
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

async function getValue(repoPath: string, opt: string) {
  const res = await commands?.getConfig(repoPath, opt);
  return match(res)
    .with({ status: 'ok' }, val => {
      return val.data;
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    })
    .exhaustive();
}

async function setConfig(repoPath: string, opt: string, value: string) {
  const res = await commands?.setConfig(repoPath, opt, value);
  match(res)
    .with({ status: 'ok' }, _ => {})
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
