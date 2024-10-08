import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { MdHome } from 'react-icons/md';
import Nav from './Nav';

type PanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

interface NavItemProps {
  to: string;
  text: string | React.ReactNode;
}

export default function Panel({ className, ...props }: PanelProps) {
  const { t } = useTranslation();
  const navs: NavItemProps[] = [
    {
      to: '/',
      text: <MdHome />,
    },
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
    <div
      className={cn('rounded-xl border shadow', DEFAULT_STYLE, className)}
      {...props}
    >
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
