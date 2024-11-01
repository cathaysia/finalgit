import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { open } from '@tauri-apps/plugin-dialog';
import { useTranslation } from 'react-i18next';
import { BsChevronExpand } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdAddToPhotos } from 'react-icons/md';
import { match } from 'ts-pattern';

export interface ProjectProps {
  projects?: string[];
  className?: string;
}

export default function Project({ projects = [], className }: ProjectProps) {
  const { t } = useTranslation();
  const [repoPath, setRepoPath] = useAppState(s => [s.repoPath, s.setRepoPath]);

  async function openRepo() {
    const value = await open({
      directory: true,
    });
    if (value === null) {
      return;
    }
    commands?.openRepo(value).then(res => {
      match(res)
        .with({ status: 'ok' }, () => {
          setRepoPath(value);
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    });
  }

  if (!repoPath) {
    return (
      <Button className="w-full" onClick={openRepo}>
        {t('project.add_local_repository')}
      </Button>
    );
  }
  const current = repoPath.split('/').at(-1);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn('flex w-full justify-between', className)}>
            {current}
            <BsChevronExpand />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ width: 'var(--radix-popper-anchor-width)' }}
        >
          <DropdownMenuGroup>
            {projects.map(item => {
              return (
                <DropdownMenuItem
                  key={item}
                  className={cn(
                    'flex justify-between',
                    item === current && 'bg-slate-200',
                  )}
                >
                  <span>{item}</span>
                  {item === current && <FaCheck className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
              );
            })}
            {projects.length !== 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="flex justify-between"
              onClick={openRepo}
            >
              <span>{t('project.add_local_repository')}</span>
              <IoIosAdd className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <span>{t('project.clone_repository')}</span>
              <MdAddToPhotos className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
