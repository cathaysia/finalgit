import type { CommitInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FaMarkdown } from 'react-icons/fa';
import { PiClockClockwise } from 'react-icons/pi';
import { VscGitCommit } from 'react-icons/vsc';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  const [raw, setRaw] = useState(false);

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
              <FaMarkdown
                onClick={() => {
                  setRaw(!raw);
                }}
                className={cn(raw && 'text-gray-500')}
              />
            </div>
            <div className="flex max-w-96 items-center gap-2">
              {raw ? (
                <pre className="prose dark:prose-invert text-wrap break-all">
                  {info.message}
                </pre>
              ) : (
                <Markdown
                  className="prose dark:prose-invert text-wrap break-all font-mono"
                  remarkPlugins={[remarkGfm]}
                >
                  {info.message}
                </Markdown>
              )}
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
