'use client';
import { type BranchInfo, type TagInfo, commands } from '@/bindings';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { refreshBranches, refreshRemotes, useRemotes } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import BranchItem from '@/ui/branch/branch-item';
import BranchList from '@/ui/branch/branch-list';
import { TagList } from '@/ui/tag/tag-list';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaCloud, FaCodeBranch, FaFilter, FaPlus, FaTag } from 'react-icons/fa';

export interface BranchCardProps {
  branches: BranchInfo[];
  tags: TagInfo[];
  className?: string;
}

export default function BranchPanel({
  branches,
  tags,
  className,
}: BranchCardProps) {
  const t = useTranslations();
  const [filter, setFilter] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const searchBar = useRef<HTMLInputElement>(null);
  const [newBranchName, setNewBranchName] = useState<string>('');
  const repoPath = useAppStore(s => s.repoPath);
  const { data: remotes } = useRemotes();
  const [isRemoteDialogOpen, setIsRemoteDialogOpen] = useState(false);
  const [remoteDialogMode, setRemoteDialogMode] = useState<
    'add' | 'rename' | 'setUrl'
  >('add');
  const [remoteTargetName, setRemoteTargetName] = useState('');
  const [remoteName, setRemoteName] = useState('');
  const [remoteUrl, setRemoteUrl] = useState('');

  useHotkeys(
    '/',
    () => {
      setIsSearching(true);
      searchBar?.current?.focus();
    },
    { preventDefault: true },
  );

  const localBranches = branches.filter(item => item.kind === 'Local');
  const remoteBranches = branches.filter(item => item.kind === 'Remote');

  const filteredLocalBranches = localBranches.filter(item => {
    if (!isSearching) {
      return true;
    }

    return item.name.includes(filter);
  });
  const filteredRemoteBranches = remoteBranches.filter(item => {
    if (!isSearching) {
      return true;
    }

    return item.name.includes(filter);
  });
  const filteredTags = tags.filter(item => {
    if (!filter) {
      return true;
    }

    return item.name.includes(filter);
  });
  const remoteGroups = Array.from(
    filteredRemoteBranches.reduce((acc, branch) => {
      if (!branch.remote) {
        return acc;
      }
      const current = acc.get(branch.remote);
      if (current) {
        current.push(branch);
      } else {
        acc.set(branch.remote, [branch]);
      }
      return acc;
    }, new Map<string, BranchInfo[]>()),
  );
  const remoteEntries = Array.from(
    (remotes ?? []).reduce((acc, remote) => {
      acc.set(remote.name, {
        url: remote.url,
        branches:
          remoteGroups.find(([name]) => name === remote.name)?.[1] ?? [],
      });
      return acc;
    }, new Map<string, { url: string; branches: BranchInfo[] }>()),
  );
  remoteGroups.forEach(([name, remoteBranches]) => {
    if (!remoteEntries.some(([entryName]) => entryName === name)) {
      remoteEntries.push([name, { url: '', branches: remoteBranches }]);
    }
  });
  remoteEntries.sort(([a], [b]) => a.localeCompare(b));
  const remoteGroupKeys = remoteEntries.map(([remote]) => remote);

  const resetRemoteDialog = () => {
    setRemoteTargetName('');
    setRemoteName('');
    setRemoteUrl('');
  };
  const handleRemoteDialogOpenChange = (open: boolean) => {
    setIsRemoteDialogOpen(open);
    if (!open) {
      resetRemoteDialog();
    }
  };
  const closeRemoteDialog = () => {
    handleRemoteDialogOpenChange(false);
  };

  const openAddRemote = () => {
    resetRemoteDialog();
    setRemoteDialogMode('add');
    setIsRemoteDialogOpen(true);
  };

  const openRenameRemote = (name: string) => {
    resetRemoteDialog();
    setRemoteTargetName(name);
    setRemoteName(name);
    setRemoteDialogMode('rename');
    setIsRemoteDialogOpen(true);
  };

  const openSetRemoteUrl = (name: string, url?: string) => {
    resetRemoteDialog();
    setRemoteTargetName(name);
    setRemoteUrl(url ?? '');
    setRemoteDialogMode('setUrl');
    setIsRemoteDialogOpen(true);
  };

  const handleRemoteDialogSubmit = async () => {
    if (!repoPath) {
      return;
    }
    if (remoteDialogMode === 'add') {
      const name = remoteName.trim();
      const url = remoteUrl.trim();
      if (!name || !url) {
        return;
      }
      const res = await commands.remoteAdd(repoPath, name, url);
      if (res.status === 'ok') {
        refreshRemotes();
        refreshBranches();
        closeRemoteDialog();
      } else {
        NOTIFY.error(res.error);
      }
      return;
    }
    if (remoteDialogMode === 'rename') {
      const name = remoteName.trim();
      if (!remoteTargetName || !name || remoteTargetName === name) {
        return;
      }
      const res = await commands.remoteRename(repoPath, remoteTargetName, name);
      if (res.status === 'ok') {
        refreshRemotes();
        refreshBranches();
        closeRemoteDialog();
      } else {
        NOTIFY.error(res.error);
      }
      return;
    }
    const url = remoteUrl.trim();
    if (!remoteTargetName || !url) {
      return;
    }
    const res = await commands.remoteSetUrl(repoPath, remoteTargetName, url);
    if (res.status === 'ok') {
      refreshRemotes();
      refreshBranches();
      closeRemoteDialog();
    } else {
      NOTIFY.error(res.error);
    }
  };

  const handleRemoteDelete = async (name: string) => {
    if (!repoPath) {
      return;
    }
    if (!window.confirm(t('branch.remote_delete_confirm', { name }))) {
      return;
    }
    const res = await commands.remoteRemove(repoPath, name);
    if (res.status === 'ok') {
      refreshRemotes();
      refreshBranches();
    } else {
      NOTIFY.error(res.error);
    }
  };

  return (
    <Tabs
      defaultValue="branch"
      className={cn('flex min-h-0 flex-1 flex-col', className)}
    >
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <TabsList className="mt-2 grid w-full grid-cols-3">
            <TabsTrigger value="branch">
              <FaCodeBranch className="mr-2" />
              <span className="inline">{t('branch.branches')}</span>
            </TabsTrigger>
            <TabsTrigger value="remote">
              <FaCloud className="mr-2" />
              <span className="inline">{t('branch.remote_branches')}</span>
            </TabsTrigger>
            <TabsTrigger value="tags">
              <FaTag className="mr-2" />
              <span className="inline">{t('branch.tags')}</span>
            </TabsTrigger>
          </TabsList>
          <div className="mt-2">
            {isSearching ? (
              <Button onClick={() => setIsSearching(false)}>
                {t('Cancel')}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsSearching(true);
                }}
                variant={'ghost'}
              >
                <FaFilter />
              </Button>
            )}
          </div>
        </div>
        <motion.div
          variants={{
            visible: {
              height: 'auto',
              transition: { duration: 0.2 },
            },
            hidden: {
              height: 0,
              overflow: 'hidden',
              transition: { duration: 0.2 },
            },
          }}
          initial="hidden"
          animate={isSearching ? 'visible' : 'hidden'}
        >
          <Input
            value={filter || ''}
            spellCheck={false}
            onChange={e => {
              setFilter(e.target.value);
            }}
            ref={searchBar}
            autoFocus
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setIsSearching(false);
              }
            }}
          />
        </motion.div>
      </div>
      <TabsContent
        value="branch"
        className="flex min-h-0 flex-1 flex-col overflow-auto"
      >
        {filteredLocalBranches.length === 0 ? (
          <div className="w-full">
            <div className="flex w-full gap-2">
              <Input
                value={newBranchName}
                disabled={!repoPath}
                onChange={v => setNewBranchName(v.target.value)}
              />
              <Button
                // disabled={!repoPath || newBranchName.length === 0}
                disabled
                onClick={async () => {
                  if (!repoPath || newBranchName.length === 0) {
                    return;
                  }
                  // TODO
                }}
              >
                {t('branch.addBranch')}
              </Button>
            </div>
          </div>
        ) : (
          <BranchList
            branches={filteredLocalBranches}
            filter={isSearching ? filter : undefined}
          />
        )}
      </TabsContent>
      <TabsContent
        value="remote"
        className="flex min-h-0 flex-1 flex-col overflow-auto"
      >
        <div className="flex items-center justify-end px-2 py-2">
          <Button size="sm" onClick={openAddRemote} disabled={!repoPath}>
            <FaPlus className="mr-2" />
            {t('branch.add_remote')}
          </Button>
        </div>
        {remoteEntries.length === 0 ? (
          <div className="px-2 py-4 text-center text-muted-foreground">
            {t('branch.remote_branches')}: 0
          </div>
        ) : (
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={remoteGroupKeys}
          >
            {remoteEntries.map(([remote, info]) => (
              <AccordionItem
                key={remote}
                value={remote}
                className="rounded-md border"
              >
                <AccordionTrigger className="px-2">
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      {remote}
                      <span className="text-muted-foreground text-xs">
                        {info.branches.length}
                      </span>
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={event => {
                            event.stopPropagation();
                          }}
                        >
                          <DotsHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            openRenameRemote(remote);
                          }}
                        >
                          {t('branch.rename_remote')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            openSetRemoteUrl(remote, info.url);
                          }}
                        >
                          {t('branch.set_url')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            handleRemoteDelete(remote);
                          }}
                        >
                          {t('branch.delete_remote')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-2">
                  <div className="flex flex-col gap-1">
                    {info.branches.map(item => (
                      <BranchItem
                        key={`${remote}/${item.name}`}
                        info={item}
                        filter={isSearching ? filter : undefined}
                      />
                    ))}
                    {info.branches.length === 0 && (
                      <div className="px-2 py-2 text-center text-muted-foreground">
                        {t('branch.remote_branches')}: 0
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </TabsContent>
      <TabsContent
        value="tags"
        className="flex min-h-0 flex-1 flex-col overflow-auto"
      >
        <TagList
          tags={filteredTags}
          filter={isSearching ? filter : undefined}
        />
      </TabsContent>
      <Dialog
        open={isRemoteDialogOpen}
        onOpenChange={handleRemoteDialogOpenChange}
      >
        <DialogContent className="w-full max-w-md">
          <DialogTitle>
            {remoteDialogMode === 'add' && t('branch.add_remote')}
            {remoteDialogMode === 'rename' && t('branch.rename_remote')}
            {remoteDialogMode === 'setUrl' && t('branch.set_url')}
          </DialogTitle>
          <div className="flex flex-col gap-3 py-2">
            {(remoteDialogMode === 'add' || remoteDialogMode === 'rename') && (
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm">
                  {t('branch.remote_name')}
                </span>
                <Input
                  value={remoteName}
                  spellCheck={false}
                  onChange={event => {
                    setRemoteName(event.target.value);
                  }}
                />
              </div>
            )}
            {(remoteDialogMode === 'add' || remoteDialogMode === 'setUrl') && (
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm">
                  {t('branch.remote_url')}
                </span>
                <Input
                  value={remoteUrl}
                  spellCheck={false}
                  onChange={event => {
                    setRemoteUrl(event.target.value);
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                closeRemoteDialog();
              }}
            >
              {t('Cancel')}
            </Button>
            <Button onClick={handleRemoteDialogSubmit}>
              {t('branch.apply')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
