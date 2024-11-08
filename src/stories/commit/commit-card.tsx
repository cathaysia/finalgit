import type { CommitInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { PiClockClockwise } from 'react-icons/pi';
import { VscGitCommit } from 'react-icons/vsc';
import UserAvatar from '../atoms/user-avatar';

export interface CommitCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: CommitInfo;
}

export default function CommitCard({
  className,
  info,
  ...props
}: CommitCardProps) {
  const names = [info.author.name];
  if (info.author.name !== info.commiter.name) {
    names.push(info.commiter.name);
  }
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex gap-2">
        <UserAvatar
          userName={names}
          className="max-h-8 max-w-8"
          orientation={'col'}
        />
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PiClockClockwise />
              <span>{formatDate(info.time)}</span>
            </div>
            <div className="flex max-w-96 items-center gap-2">
              <pre className="text-wrap break-all">{info.message}</pre>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/filetree/${info.oid}`}
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
