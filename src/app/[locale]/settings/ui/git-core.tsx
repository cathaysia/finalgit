import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import GitOption from '@/ui/atoms/git-option';
import GitSwitch from '@/ui/atoms/git-switch';
import { useTranslations } from 'next-intl';

type GitCoreProps = React.HtmlHTMLAttributes<HTMLDivElement>;
export default function GitCore({ className, ...props }: GitCoreProps) {
  const t = useTranslations();

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{t('profile.git.core')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <GitSwitch
          name={t('profile.git.commit.gpgsign')}
          id="profile.git.commitsign"
          opt={'commit.gpgsign'}
        />
        <GitSwitch
          name={t('profile.git.tag.gpgsign')}
          id="profile.git.tag.gpgsign"
          opt={'tag.gpgsign'}
        />
        <GitOption
          id="profile.git.defaultBranch"
          name={t('profile.git.defaultBranch')}
          opt={'init.defaultbranch'}
        />
      </CardContent>
    </Card>
  );
}
