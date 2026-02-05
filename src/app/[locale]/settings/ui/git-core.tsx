'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import GitOption from '@/ui/atoms/git-option';
import GitSwitch from '@/ui/atoms/git-switch';
import { useTranslations } from 'next-intl';

type GitCoreProps = React.HtmlHTMLAttributes<HTMLDivElement>;
export default function GitCore({ className, ...props }: GitCoreProps) {
  const t = useTranslations();
  const [ghApi, setGhApi, ghToken, setGhToken] = useAppStore(s => [
    s.githubApiUrl,
    s.setGithubApiUrl,
    s.githubToken,
    s.setGithubToken,
  ]);

  return (
    <div
      className={cn(
        'w-full border-border/60 bg-background/80 shadow-sm backdrop-blur dark:bg-background/60',
        className,
      )}
      {...props}
    >
      <a>{t('profile.git.core')}</a>
      <div className="flex flex-col gap-2">
        <GitSwitch
          name={t('profile.git.commit.gpgsign')}
          description={t('profile.git.commit.gpgsign_desc')}
          id="profile.git.commitsign"
          opt={'commit.gpgsign'}
        />
        <GitSwitch
          name={t('profile.git.tag.gpgsign')}
          description={t('profile.git.tag.gpgsign_desc')}
          id="profile.git.tag.gpgsign"
          opt={'tag.gpgsign'}
        />
        <GitOption
          id="profile.git.defaultBranch"
          name={t('profile.git.defaultBranch')}
          opt={'init.defaultbranch'}
        />
        <div className="flex flex-col gap-2">
          <Label>{t('profile.gh.api')}</Label>
          <Input
            type="url"
            onChange={e => {
              setGhApi(e.target.value);
            }}
            value={ghApi}
            placeholder="https://api.github.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>{t('profile.gh.token')}</Label>
          <Input
            type="text"
            onChange={e => {
              setGhToken(e.target.value);
            }}
            value={ghToken}
          />
        </div>
      </div>
    </div>
  );
}
