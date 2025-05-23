import type { CommitInfo, TagInfo } from '@/bindings';
import { AvatarGroup } from '@/components/ext/avatar-group';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCommitChanges, useRemotes } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { open } from '@tauri-apps/plugin-shell';
import { useMemo } from 'react';
import { FaMarkdown, FaTag } from 'react-icons/fa';
import { PiClockClockwise } from 'react-icons/pi';
import { VscGitCommit } from 'react-icons/vsc';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UserAvatar } from '../atoms/user-avatar';

export interface CommitCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: CommitInfo;
  tags: TagInfo[];
}

export default function CommitCard({
  className,
  info,
  tags,
  ...props
}: CommitCardProps) {
  const names = [info.author.name];
  if (info.author.name !== info.commiter.name) {
    names.push(info.commiter.name);
  }
  const [renderMarkdown, setRenderMarkdown] = useAppStore(s => [
    s.renderMarkdown,
    s.setRenderMarkdown,
  ]);
  const { data: changInfo } = useCommitChanges(info.oid);

  const { data: branches } = useRemotes();
  let repo: null | string = null;
  branches?.forEach(item => {
    if (item.url) {
      const group = /.*github.com(:443)?[:/](.*)(\.git)?/.exec(item.url)?.at(2);
      repo = group || null;
    }
  });
  const mdData = useMemo(() => {
    if (repo) {
      return info.message.replace(
        /#(\d+)/,
        `[#$1](https://github.com/${repo}/issues/$1)`,
      );
    }
    return null;
  }, [info.message]);

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex gap-2">
        <AvatarGroup orientation="col">
          {names.map(item => {
            return (
              <UserAvatar
                key={item}
                userName={item}
                className="max-h-8 max-w-8"
              />
            );
          })}
        </AvatarGroup>
        <div className="flex min-w-0 grow flex-col gap-2">
          <div className="flex grow items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PiClockClockwise />
              <span className="whitespace-nowrap">{formatDate(info.time)}</span>
              <FaMarkdown
                onClick={() => {
                  setRenderMarkdown(!renderMarkdown);
                }}
                className={cn(!renderMarkdown && 'text-gray-500')}
              />
            </div>
            <div className="flex gap-2">
              <span className="text-green-500">+{changInfo?.add}</span>
              <span className="text-red-500">-{changInfo?.del}</span>
            </div>

            <TooltipProvider>
              <div className="flex min-w-0 items-center gap-2">
                {tags.map(tag => {
                  return (
                    <Tooltip key={tag.name}>
                      <TooltipTrigger className="min-w-0">
                        <Badge className="w-full">
                          <FaTag />
                          <span
                            className="min-w-0 flex-1 overflow-x-hidden text-ellipsis whitespace-nowrap"
                            dir="rtl"
                          >
                            {tag.name}
                          </span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>{tag.name}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>
          <ScrollArea
            className="flex h-72 max-w-96 items-center gap-2"
            onClick={e => {
              const target = e.target as HTMLAnchorElement;
              if (target.href) {
                open(target.href);
                e.preventDefault();
              }
            }}
          >
            {renderMarkdown ? (
              <Markdown
                className="prose dark:prose-invert text-wrap break-all font-mono"
                remarkPlugins={[remarkGfm]}
              >
                {mdData || info.message}
              </Markdown>
            ) : (
              <pre className="prose dark:prose-invert text-wrap break-all">
                {info.message}
              </pre>
            )}
          </ScrollArea>
        </div>
      </div>
      <Link
        href={{
          pathname: '/filetree/',
          query: {
            commit: info.oid,
          },
        }}
        className="flex items-center gap-2 text-blue-600"
      >
        <VscGitCommit />
        {info.oid.slice(0, 6)}
      </Link>
    </div>
  );
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
