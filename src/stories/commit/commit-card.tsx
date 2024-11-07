import type { CommitInfo } from '@/bindings';
import { cn } from '@/lib/utils';

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
      <div className="font-bold">{info.summary}</div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Time:</span>
          <span>{formatDate(info.time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Commit:</span>
          <span>{info.oid}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Author:</span>
          <span>{`${info.author.name} <${info.author.email}>`}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Committer:</span>
          <span>{`${info.commiter.name} <${info.commiter.email}>`}</span>
        </div>
        <div className="flex max-w-96 items-center gap-2 whitespace-nowrap text-wrap">
          <span className="font-medium">Message:</span>
          <span>{info.message}</span>
        </div>
      </div>
    </div>
  );
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
