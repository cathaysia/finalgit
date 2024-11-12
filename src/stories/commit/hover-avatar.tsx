import { type Activity, ActivityCalendar } from 'react-activity-calendar';

import { useStatisOfAuthor } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import { useEffect, useState } from 'react';
import { UserAvatar } from '../atoms/user-avatar';

export interface HoverAvatarProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  userName: string;
}

export default function HoverAvatar({ userName }: HoverAvatarProps) {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [data, setData] = useState<Activity[]>([]);
  const { data: statics } = useStatisOfAuthor(userName);
  useEffect(() => {
    if (!repoPath || !statics) {
      return;
    }
    const res = statics.map(item => {
      const date = new Date(item.date * 1000);
      return {
        date: date.toISOString(),
        count: item.count,
        level: item.count > 5 ? 5 : item.count,
      };
    });
    setData(res);
  }, [statics]);

  return (
    <div className="flex flex-col">
      <UserAvatar userName={userName} className="max-h-8 max-w-8" />
      {data.length !== 0 && (
        <ActivityCalendar data={data} maxLevel={5} colorScheme="light" />
      )}
    </div>
  );
}
