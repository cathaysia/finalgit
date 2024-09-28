import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface GitCoreProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function GitCore({ className, ...props }: GitCoreProps) {
  const { t } = useTranslation();
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{t('profile.git.core')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <Label>{t('profile.git.gpg_sign')}</Label>
          <Checkbox />
        </div>
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
