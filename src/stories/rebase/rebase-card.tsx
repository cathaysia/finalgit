import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { refreshHeadState, useHeadState } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import * as Portal from '@radix-ui/react-portal';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'sonner';
import { isMatching } from 'ts-pattern';

export interface RebaseCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function RebaseCard({ className, ...props }: RebaseCardProps) {
  const { t } = useTranslation();
  const [repoPath] = useAppState(s => [s.repoPath]);
  const { data: headState } = useHeadState();
  const isRebasing =
    headState === 'Rebase' || headState === 'RebaseInteractive';

  const [bisectId, setBisectId] = useState<number | string | undefined>();
  const blameWidget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRebasing && !bisectId) {
      const id = toast(<div ref={blameWidget} />, {
        duration: Number.POSITIVE_INFINITY,
        unstyled: true,
        position: 'top-center',
      });
      setBisectId(id);
    }
  }, [isRebasing]);

  useEffect(() => {
    if (!isRebasing && bisectId) {
      toast.dismiss(bisectId);
      setBisectId(undefined);
    }
  }, [bisectId, isRebasing]);

  return (
    <div className={cn(className)} {...props}>
      {isRebasing && (
        <Portal.Root container={blameWidget.current} asChild>
          <div
            className={cn(
              'flex items-center gap-2',
              'rounded-2xl bg-primary pt-1 pr-4 pb-1 pl-4 text-white dark:text-black',
            )}
          >
            {isRebasing && (
              <>
                <CgSpinner className="inline-block animate-spin" />
                <span>{t('rebase.doing')}</span>
              </>
            )}

            <Button
              title={t('rebase.continue')}
              onClick={() => {
                if (repoPath) {
                  rebaseContinue(repoPath);
                }
              }}
              className="h-4 w-4 bg-green-500 p-0 hover:bg-green-300 dark:bg-green-500 hover:dark:bg-green-300"
              disabled
            />
            <Button
              title={t('rebase.abort')}
              onClick={() => {
                if (repoPath) {
                  rebaseAbort(repoPath);
                }
              }}
              className="h-4 w-4 bg-red-500 p-0 hover:bg-red-300 dark:bg-red-500 hover:dark:bg-red-300"
            />
          </div>
        </Portal.Root>
      )}
    </div>
  );
}

async function rebaseAbort(repoPath: string) {
  const res = await commands.rebaseAbort(repoPath);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
  }
  refreshHeadState();
}

async function rebaseContinue(repoPath: string) {
  const res = await commands.rebaseContinue(repoPath);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
  }
  refreshHeadState();
}
