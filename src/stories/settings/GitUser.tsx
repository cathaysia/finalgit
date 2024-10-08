import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import GitOption from '../atoms/GitOption';

type GitUserProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function GitUser({ className, ...props }: GitUserProps) {
  const { t } = useTranslation();
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{t('profile.git.user')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <GitOption
          name={t('profile.git.username')}
          id="profile.git.username"
          opt={'user.name'}
        />
        <GitOption
          name={t('profile.git.email')}
          id="profile.git.email"
          opt={'user.email'}
        />
        <GitOption
          name={t('profile.git.signingKey')}
          id="profile.git.signingKey"
          opt={'user.signingkey'}
        />
      </CardContent>
    </Card>
  );
}
