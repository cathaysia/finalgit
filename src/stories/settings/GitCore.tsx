import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import GitSwitch from '../atoms/GitSwitch';

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
        <div>
          <Label>{t('profile.git.defaultBranch')}</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>{t('profile.git.pull')}</Label>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rebase">{t('profile.git.rebase')}</SelectItem>
              <SelectItem value="norebase">
                {t('profile.git.norebase')}
              </SelectItem>
              <SelectItem value="ff">{t('profile.git.ff')}</SelectItem>
              <SelectItem value="noff">{t('profile.git.noff')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
