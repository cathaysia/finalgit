import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface GitUserProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function GitUser({ className, ...props }: GitUserProps) {
  const { t } = useTranslation();
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{t('profile.git.user')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label>{t('profile.git.username')}</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>{t('profile.git.email')}</Label>
          <Input type="email" />
        </div>
        <div>
          <Label>{t('profile.git.signingKey')}</Label>
          <Input type="text" />
        </div>
      </CardContent>
    </Card>
  );
}
