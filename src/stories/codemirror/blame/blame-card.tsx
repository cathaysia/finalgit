import type { BlameHunk } from '@/bindings';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { useCommitInfo } from '@/hooks/query';

export interface BlameCardProps {
  blame: BlameHunk;
}

// NOTE: CANNOT USE HOOKS
export function BlameCard({ blame }: BlameCardProps) {
  const date = new Date(0);
  date.setSeconds(blame.signature.time);
  const dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getSeconds()}`;
  let line = `${blame.signature.name} - ${dateFormat}`;

  const { data: commit } = useCommitInfo(blame.final_commit_id);
  if (commit) {
    line += ` ${commit.summary.slice(0, 12)}`;
  }

  return (
    <HoverCard>
      <HoverCardTrigger className="flex">
        <Label
          className="ml-2 text-gray-500 hover:text-blue-800 hover:underline"
          aria-hidden
        >
          {line}
        </Label>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-auto flex-col gap-2">
        <span>author: {blame.signature.name}</span>
        <span>date: {`${date}`}</span>
        <span>last_modified: {blame.final_start_line}</span>
        {commit && (
          <div className="flex flex-col">
            <span>{commit.message}</span>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
