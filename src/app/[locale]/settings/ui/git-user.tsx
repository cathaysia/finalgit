import { commands } from '@/bindings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/hooks/use-store';
import { getGitConfig, setGitConfig } from '@/lib/git';
import { cn } from '@/lib/utils';
import GitOption from '@/ui/atoms/git-option';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

type GitUserProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function GitUser({ className, ...props }: GitUserProps) {
  const t = useTranslations();
  const [gpgList, setGpgList] = useState<string[]>([]);
  const [curGpg, setCurGpg] = useState<string>();
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const [refreshGpg, setRefeshGpg] = useState<boolean>(false);

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    getGitConfig(repoPath, 'user.signingkey').then(val => {
      if (val) {
        setCurGpg(val);
      }
    });
  }, [repoPath, refreshGpg]);

  useEffect(() => {
    commands.gpgGetSecretList().then(val => {
      match(val).with({ status: 'ok' }, val => {
        setGpgList(val.data);
      });
    });
  });

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
        <div>
          <Label>{t('profile.git.signingKey')}</Label>
          <Select
            value={curGpg}
            onValueChange={async value => {
              if (repoPath) {
                await setGitConfig(repoPath, 'user.signingKey', value);
                setRefeshGpg(!refreshGpg);
              }
            }}
            disabled={gpgList.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('profile.git.select_gpg')} />
            </SelectTrigger>
            <SelectContent>
              {gpgList.map(item => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
