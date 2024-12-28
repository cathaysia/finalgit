import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import GitOption from '../../../../stories/atoms/git-option';
import GitSwitch from '../../../../stories/atoms/git-switch';

type GitCoreProps = React.HtmlHTMLAttributes<HTMLDivElement>;
export default function GitCore({ className, ...props }: GitCoreProps) {
  const { t } = useTranslation();

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
