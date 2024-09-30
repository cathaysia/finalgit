import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface HighLightLabelProps
  extends React.ComponentProps<typeof Label> {
  text: string;
  filter?: string;
}

export default function HighLightLabel({
  className,
  text,
  filter,
  ...props
}: HighLightLabelProps) {
  if (!filter) {
    return (
      <Label className={cn(className)} title={text} {...props}>
        {text}
      </Label>
    );
  }

  const v = text.replace(
    filter,
    `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
  );
  return (
    <Label
      className={cn(className)}
      title={text}
      dangerouslySetInnerHTML={{ __html: v }}
      {...props}
    />
  );
}
