import type { BlameHunk } from '@/bindings';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';

// NOTE: CANNOT USE HOOKS
export function BlameCard(blame: BlameHunk) {
  const date = new Date(0);
  date.setSeconds(blame.signature.time);
  const dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getSeconds()}`;
  const line = `${blame.signature.name} - ${dateFormat}`;

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Label
          className="cm-boolean-toggle mx-2 rounded-md bg-slate-300 px-2 shadow dark:bg-slate-700"
          aria-hidden
        >
          {line}
        </Label>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-2">
        <span>author: {blame.signature.name}</span>
        <span>date: {`${date}`}</span>
        <span>last_modified: {blame.final_start_line}</span>
      </HoverCardContent>
    </HoverCard>
  );
}
