import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useTranslations } from 'next-intl';
import { BsChevronExpand } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdAddToPhotos } from 'react-icons/md';
import { match } from 'ts-pattern';
import { CloneWidget } from './clone';

export interface ProjectProps {
  className?: string;
}

export default function Project({ className }: ProjectProps) {
  const t = useTranslations('project');
  const [repoPath, setRepoPath, projects, removeRepoPath] = useAppState(s => [
    s.repoPath,
    s.setRepoPath,
    s.projects,
    s.removeRepoPath,
  ]);

  async function openRepo() {
    const value = await open({
      directory: true,
    });
    if (value === null) {
      return;
    }
    commands?.repoOpen(value).then(res => {
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
        {t('open_local_repository')}
      </Button>
    );
  }
  const current = repoPath.split('/').at(-1);

  return (
    <>
      <Dialog>
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
              {Array.from(projects.values()).map(item => {
                const [first, second] = [
                  item.slice(0, item.length / 2),
                  item.slice(item.length / 2),
                ];
                return (
                  <div key={item} className="flex justify-between gap-2">
                    <DropdownMenuItem
                      className={cn('flex min-w-0 grow justify-between')}
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
                      {item === repoPath && (
                        <FaCheck className="ml-2 h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    <Button
                      variant={'ghost'}
                      className="h-8 w-8"
                      onClick={e => {
                        removeRepoPath(item);
                        e.preventDefault();
                      }}
                    >
                      -
                    </Button>
                  </div>
                );
              })}
              {projects.size !== 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem
                className="flex justify-between"
                onClick={openRepo}
              >
                <span>{t('open_local_repository')}</span>
                <IoIosAdd className="ml-2 h-4 w-4" />
              </DropdownMenuItem>
              <DialogTrigger className="w-full">
                <DropdownMenuItem className="flex justify-between">
                  <span>{t('clone_repository')}</span>
                  <MdAddToPhotos className="ml-2 h-4 w-4" />
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent title="xx" className="w-full">
          <DialogTitle>{t('clone_remote_repo')}</DialogTitle>
          <CloneWidget />
        </DialogContent>
      </Dialog>
    </>
  );
}
