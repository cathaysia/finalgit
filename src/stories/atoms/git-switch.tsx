import { commands } from '@/bindings';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { isMatching, match } from 'ts-pattern';

export interface GitSwitchProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  opt: string;
}

export default function GitSwitch({
  className,
  name,
  id,
  opt,
  ...props
}: GitSwitchProps) {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    getBooleanConfig(repoPath, opt).then(val => {
      if (val) {
        setValue(val);
      }
    });
  }, [repoPath, opt]);

  return (
    <div className={cn('flex justify-between', className)} {...props}>
      <Label htmlFor={id}>{name}</Label>
      <Switch
        id={id}
        checked={value}
        onCheckedChange={async e => {
          if (repoPath) {
            await setBooleanConfig(repoPath, opt, e.valueOf());
            setValue(e.valueOf());
          }
        }}
      />
    </div>
  );
}

async function getBooleanConfig(repoPath: string, opt: string) {
  const res = await commands?.configGet(repoPath, opt);
  if (isMatching({ status: 'ok' }, res)) {
    if (res.data === 'true') {
      return true;
    }
  }

  return false;
}

async function setBooleanConfig(repoPath: string, opt: string, value: boolean) {
  const res = await commands?.configSet(
    repoPath,
    opt,
    value ? 'true' : 'false',
  );
  match(res)
    .with({ status: 'ok' }, _ => {})
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
