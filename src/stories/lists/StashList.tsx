import type { StashInfo } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export interface StashListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function StashList({ className, ...props }: StashListProps) {
  const { t } = useTranslation();
  const mock: StashInfo[] = [
    {
      id: 0,
      oid: 'bf21da947b3530ff8527260c3e6a67f601af890f',
      message: 'stash first',
    },
    {
      id: 1,
      oid: 'bf21da947b3530ff8527260c3e6a67f601af890f',
      message: 'stash sec',
    },
    {
      id: 2,
      oid: 'bf21da947b3530ff8527260c3e6a67f601af890f',
      message: 'stash third',
    },
  ];

  return (
    <div className={cn(className)} {...props}>
      {mock.map(item => {
        return (
          <div key={item.oid} className="flex gap-2">
            {item.message}
            <Badge className="font-mono">{item.oid.slice(0, 6)}</Badge>
          </div>
        );
      })}
    </div>
  );
}
