import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { MdHome, MdPerson, MdPsychology, MdSource } from 'react-icons/md';
import Nav from './nav';

type PanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

interface NavItemProps {
  to: string;
  text: string | React.ReactNode;
}

export default function Panel({ className, ...props }: PanelProps) {
  const t = useTranslations();
  const navs: NavItemProps[] = [
    {
      to: '/settings',
      text: (
        <>
          <MdPerson className="h-4 w-4" />
          <span>{t('settings.profile')}</span>
        </>
      ),
    },
    {
      to: '/settings/git',
      text: (
        <>
          <MdSource className="h-4 w-4" />
          <span>{t('settings.git')}</span>
        </>
      ),
    },
    {
      to: '/settings/ai',
      text: (
        <>
          <MdPsychology className="h-4 w-4" />
          <span>{t('settings.ai')}</span>
        </>
      ),
    },
  ];
  return (
    <div className={cn('flex flex-col gap-4 px-4 py-6', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            {t('controlbar.preference')}
          </span>
          <span className="font-semibold text-lg">{t('settings.profile')}</span>
        </div>
        <Nav
          href="/"
          className="h-9 w-9 rounded-lg border bg-background/80 p-0"
        >
          <MdHome />
        </Nav>
      </div>
      <div className="flex flex-col gap-2">
        {navs.map(item => {
          return (
            <Nav
              key={item.to}
              href={item.to}
              className={cn(
                'h-12 w-full justify-start gap-3 rounded-xl border border-transparent px-3 font-semibold text-sm uppercase tracking-[0.12em]',
              )}
            >
              {item.text}
            </Nav>
          );
        })}
      </div>
    </div>
  );
}
