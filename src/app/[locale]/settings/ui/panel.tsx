import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { MdHome } from 'react-icons/md';
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
      text: t('settings.profile'),
    },
    {
      to: '/settings/git',
      text: t('settings.git'),
    },
    {
      to: '/settings/ai',
      text: t('settings.ai'),
    },
  ];
  return (
    <div className={className} {...props}>
      <Nav href="/" className="h-16 w-full rounded-t-xl border-b">
        <MdHome />
      </Nav>
      {navs.map(item => {
        return (
          <Nav
            key={item.to}
            href={item.to}
            className={cn('h-16 w-full border-b')}
          >
            {item.text}
          </Nav>
        );
      })}
    </div>
  );
}
