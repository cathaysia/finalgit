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
  description?: string;
  opt: string;
}

export default function GitSwitch({
  className,
  name,
  description,
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
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-lg border px-4 py-3 transition hover:border-border/80 hover:bg-muted/40',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} className="font-semibold text-sm">
          {name}
        </Label>
        {description && (
          <span className="text-muted-foreground text-xs">{description}</span>
        )}
      </div>
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
