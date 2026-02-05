'use client';
import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import {
  refreshChanges,
  refreshHeadState,
  refreshHistory,
  useHeadState,
} from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import * as Portal from '@radix-ui/react-portal';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'sonner';
import { isMatching } from 'ts-pattern';

export interface CherryPickCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function CherryPickCard({
  className,
  ...props
}: CherryPickCardProps) {
  const t = useTranslations();
  const [repoPath, queue, clearQueue] = useAppStore(s => [
    s.repoPath,
    s.cherryPickQueue,
    s.clearCherryPickQueue,
  ]);
  const { data: headState } = useHeadState();
  const isCherryPicking =
    headState === 'CherryPick' || headState === 'CherryPickSequence';

  const [toastId, setToastId] = useState<number | string | undefined>();
  const toastContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((isCherryPicking || queue.length > 0) && !toastId) {
      const id = toast(<div ref={toastContainer} />, {
        duration: Number.POSITIVE_INFINITY,
        unstyled: true,
        position: 'top-center',
      });
      setToastId(id);
    }
  }, [isCherryPicking, queue.length, toastId]);

  useEffect(() => {
    if (!isCherryPicking && queue.length === 0 && toastId) {
      toast.dismiss(toastId);
      setToastId(undefined);
    }
  }, [isCherryPicking, queue.length, toastId]);

  return (
    <div className={cn(className)} {...props}>
      {(isCherryPicking || queue.length > 0) && (
        <Portal.Root container={toastContainer.current} asChild>
          <div
            className={cn(
              'flex items-center gap-2',
              'rounded-2xl bg-primary pt-1 pr-4 pb-1 pl-4 text-white dark:text-black',
            )}
          >
            {isCherryPicking && (
              <CgSpinner className="inline-block animate-spin" />
            )}
            <span>{t('island.cherrypick_queue')}</span>
            <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
              {queue.map(oid => (
                <span
                  key={oid}
                  className="rounded bg-background/20 px-1 py-0.5"
                >
                  {oid.slice(0, 6)}
                </span>
              ))}
            </div>
            <Button
              title={
                isCherryPicking
                  ? t('commit.cherrypick_abort')
                  : t('commit.cherrypick_clear_queue')
              }
              onClick={() => {
                if (repoPath) {
                  if (isCherryPicking) {
                    cherryPickAbort(repoPath, clearQueue);
                  } else {
                    clearQueue();
                    refreshHeadState();
                    refreshChanges();
                    refreshHistory();
                  }
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

async function cherryPickAbort(repoPath: string, clearQueue: () => void) {
  const res = await commands.cherryPickAbort(repoPath);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
    return;
  }
  clearQueue();
  refreshHeadState();
  refreshChanges();
  refreshHistory();
}
