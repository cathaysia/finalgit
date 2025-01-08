import { Tooltip } from '@/components/ext/tooltip';
import HeatMap from '@uiw/react-heat-map';

import { useStatisOfAuthor } from '@/hooks/query';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { UserAvatar } from '../atoms/user-avatar';

export interface HoverAvatarProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  userName: string;
  email: string;
}

export default function HoverAvatar({ userName, email }: HoverAvatarProps) {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const { data: statics } = useStatisOfAuthor(userName);

  const [value, min] = useMemo(() => {
    if (!statics) {
      return [[], new Date()];
    }
    const threeMonth = statics.reverse().slice(0, 90).reverse();

    return [
      threeMonth.map(item => {
        const date = new Date(item.date * 1000);
        return {
          date: date.toLocaleDateString(),
          count: item.count,
        };
      }),
      new Date(Math.min(...threeMonth.map(item => item.date)) * 1000),
    ];
  }, [statics]);

  const panelColors =
    resolvedTheme === 'light'
      ? undefined
      : {
          0: '#161b22',
          7: '#0e4429',
          14: '#006d32',
          21: '#26a641',
          28: '#39d353',
        };

  const headmapStyle =
    resolvedTheme === 'light'
      ? undefined
      : {
          color: 'white',
        };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <UserAvatar userName={userName} className="max-h-8 max-w-8" />
        <div className="flex flex-col">
          <span>{userName}</span>
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
        </div>
      </div>
      <div className={cn()}>
        <HeatMap
          value={value}
          startDate={min}
          style={headmapStyle}
          panelColors={panelColors}
          weekLabels={[
            t('heatmap.Sun'),
            t('heatmap.Mon'),
            t('heatmap.Tue'),
            t('heatmap.Wed'),
            t('heatmap.Thu'),
            t('heatmap.Fri'),
            t('heatmap.Sat'),
          ]}
          monthLabels={[
            t('heatmap.Jan'),
            t('heatmap.Feb'),
            t('heatmap.Mar'),
            t('heatmap.Apr'),
            t('heatmap.May'),
            t('heatmap.Jun'),
            t('heatmap.Jul'),
            t('heatmap.Aug'),
            t('heatmap.Sep'),
            t('heatmap.Oct'),
            t('heatmap.Nov'),
            t('heatmap.Dec'),
          ]}
          legendCellSize={0}
          legendRender={props => {
            return <rect {...props} rx={2} />;
          }}
          rectRender={(props, data) => {
            return (
              <Tooltip
                title={t('heatmap.contribute', {
                  date: data.date,
                  count: data.count || 0,
                })}
              >
                <rect {...props} rx={2} />
              </Tooltip>
            );
          }}
        />
      </div>
    </div>
  );
}
