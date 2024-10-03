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

  async function getValue() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.getConfig(repoPath, opt);
    match(res)
      .with({ status: 'ok' }, val => {
        setValue(val.data);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  useEffect(() => {
    getValue();
  }, [repoPath]);

  async function handleValueChange(value: string) {
    if (!repoPath) {
      return;
    }
    const res = await commands?.setConfig(repoPath, opt, value);
    match(res)
      .with({ status: 'ok' }, _ => {})
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  useEffect(() => {
    if (!debounce) {
      return;
    }
    handleValueChange(debounce);
  }, [debounce]);

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
