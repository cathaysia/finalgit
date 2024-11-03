import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface HighLightLabelProps
  extends React.ComponentProps<typeof Label> {
  text: string;
  value?: string;
  filter?: string;
}

export default function HighLightLabel({
  className,
  text,
  value,
  filter,
  ...props
}: HighLightLabelProps) {
  if (!value) {
    value = text;
  }

  if (!filter) {
    return (
      <Label className={cn(className)} title={value} {...props}>
        {text}
      </Label>
    );
  }

  const v = value.replace(
    filter,
    `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
  );
  return (
    <Label
      className={cn(className)}
      title={value}
      dangerouslySetInnerHTML={{ __html: v }}
      {...props}
    />
  );
}
