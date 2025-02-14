import { commands } from '@/bindings';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useGitOpts } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

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
  const { data: gitOpt } = useGitOpts(opt);
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    if (!gitOpt) {
      return;
    }
    setValue(gitOpt === 'true');
  }, [repoPath, gitOpt]);

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
