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
  className?: string;
}

export default function Project({ className }: ProjectProps) {
  const { t } = useTranslation();
  const [repoPath, setRepoPath, projects] = useAppState(s => [
    s.repoPath,
    s.setRepoPath,
    s.projects,
  ]);

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
        {t('project.open_local_repository')}
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
              const [first, second] = [
                item.slice(0, item.length / 2),
                item.slice(item.length / 2),
              ];
              return (
                <DropdownMenuItem
                  key={item}
                  className={cn('flex justify-between')}
                  onClick={() => {
                    if (item === repoPath) {
                      return;
                    }
                    setRepoPath(item);
                  }}
                >
                  <span className="flex w-full">
                    <span className="overflow-x-hidden text-ellipsis whitespace-nowrap">
                      {first}
                    </span>
                    <span
                      dir="rtl"
                      className="overflow-x-hidden whitespace-nowrap"
                    >
                      <span dir="ltr">{second}</span>
                    </span>
                  </span>
                  {item === repoPath && <FaCheck className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
              );
            })}
            {projects.length !== 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="flex justify-between"
              onClick={openRepo}
            >
              <span>{t('project.open_local_repository')}</span>
              <IoIosAdd className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between" disabled>
              <span>{t('project.clone_repository')}</span>
              <MdAddToPhotos className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
