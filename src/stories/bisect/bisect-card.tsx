import type { BisectState } from '@/hooks/bisect';
import { cn } from '@/lib/utils';
import * as Portal from '@radix-ui/react-portal';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';

export interface RebaseCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  bisectState: BisectState;
}

export default function BisectCard({
  className,
  bisectState,
  ...props
}: RebaseCardProps) {
  const { t } = useTranslation();

  const [bisectId, setBisectId] = useState<number | string | undefined>();
  const blameWidget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isBisect = bisectState.isBisecting;
    if (isBisect && !bisectId) {
      const id = toast(<div ref={blameWidget} />, {
        duration: Number.POSITIVE_INFINITY,
        unstyled: true,
        position: 'top-center',
      });
      setBisectId(id);
    }
  }, [bisectState.isBisecting]);

  useEffect(() => {
    if (!bisectState.isBisecting && bisectId) {
      toast.dismiss(bisectId);
      setBisectId(undefined);
    }
  }, [bisectId, bisectState.isBisecting]);

  return (
    <div className={cn(className)} {...props}>
      {bisectState.isBisecting && (
        <Portal.Root container={blameWidget.current} asChild>
          <div
            className={cn(
              'flex items-center gap-2',
              'rounded-2xl bg-primary pt-1 pr-4 pb-1 pl-4 text-white dark:text-black',
            )}
          >
            {!bisectState.firstBad ? (
              <>
                <CgSpinner className="inline-block animate-spin" />
                <span>{t('island.bisecting')}</span>
              </>
            ) : (
              <div className="item-center flex gap-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <FaCheckCircle className="text-green-500" />
                </motion.span>
                {t(
                  `island.rebase.firstbad is ${bisectState.firstBad.slice(0, 6)}`,
                )}
              </div>
            )}
          </div>
        </Portal.Root>
      )}
    </div>
  );
}