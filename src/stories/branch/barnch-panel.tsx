'use client';
import type { BranchInfo, TagInfo } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import BranchList from '@/stories/branch/branch-list';
import { TagList } from '@/stories/tag/tag-list';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch, FaFilter, FaTag } from 'react-icons/fa';

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
  const t = useTranslation().t;
  const [filter, setFilter] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const searchBar = useRef<HTMLInputElement>(null);

  useHotkeys(
    '/',
    () => {
      setIsSearching(true);
      searchBar?.current?.focus();
    },
    { preventDefault: true },
  );

  const filteredBranches = branches.filter(item => {
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

  return (
    <Tabs
      defaultValue="branch"
      className={cn('flex h-full flex-col border focus:bg-red-50', className)}
    >
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <TabsList className={cn('mt-2 grid w-full grid-cols-2')}>
            <TabsTrigger value="branch">
              <FaCodeBranch className="mr-2" />
              {t('branch.branches')}
            </TabsTrigger>
            <TabsTrigger value="tags">
              <FaTag className="mr-2" />
              {t('branch.tags')}
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
              opacity: 1,
              transition: { duration: 0.2 },
            },
            hidden: {
              height: 0,
              opacity: 0,
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
      <TabsContent value="branch" className="h-full">
        <BranchList
          branches={filteredBranches}
          filter={isSearching ? filter : undefined}
        />
      </TabsContent>
      <TabsContent value="tags" className="h-full">
        <TagList
          tags={filteredTags}
          filter={isSearching ? filter : undefined}
        />
      </TabsContent>
    </Tabs>
  );
}
