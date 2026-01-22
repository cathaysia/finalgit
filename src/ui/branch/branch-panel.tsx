'use client';
import type { BranchInfo, TagInfo } from '@/bindings';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import BranchItem from '@/ui/branch/branch-item';
import BranchList from '@/ui/branch/branch-list';
import { TagList } from '@/ui/tag/tag-list';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaCloud, FaCodeBranch, FaFilter, FaTag } from 'react-icons/fa';

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
      const key = branch.remote ?? t('branch.remote');
      const current = acc.get(key);
      if (current) {
        current.push(branch);
      } else {
        acc.set(key, [branch]);
      }
      return acc;
    }, new Map<string, BranchInfo[]>()),
  ).sort(([a], [b]) => a.localeCompare(b));
  const remoteGroupKeys = remoteGroups.map(([remote]) => remote);

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
        {filteredRemoteBranches.length === 0 ? (
          <div className="px-2 py-4 text-center text-muted-foreground">
            {t('branch.remote_branches')}: 0
          </div>
        ) : (
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={remoteGroupKeys}
          >
            {remoteGroups.map(([remote, remoteBranches]) => (
              <AccordionItem
                key={remote}
                value={remote}
                className="rounded-md border"
              >
                <AccordionTrigger className="px-2">
                  <span className="flex items-center gap-2">
                    {remote}
                    <span className="text-muted-foreground text-xs">
                      {remoteBranches.length}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-2">
                  <div className="flex flex-col gap-1">
                    {remoteBranches.map(item => (
                      <BranchItem
                        key={`${remote}/${item.name}`}
                        info={item}
                        filter={isSearching ? filter : undefined}
                      />
                    ))}
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
    </Tabs>
  );
}
