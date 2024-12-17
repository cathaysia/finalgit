import { Input } from '@/components/ui/input';
import {
  type UseAutocompleteProps,
  useAutocomplete,
} from '@mui/base/useAutocomplete';

export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  getOptionLabel,
  ...props
}: UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    getOptionLabel,
    ...props,
  });

  return (
    <div className="flex flex-col gap-2">
      <div {...getRootProps()}>
        <Input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul
          className="z-10 max-h-[300] w-[200] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-md [&_.Mui-focused]:bg-accent"
          {...getListboxProps()}
        >
          {(groupedOptions as Value[]).map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li
                className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent active:bg-accent "
                key={key}
                {...optionProps}
              >
                {getOptionLabel?.(option)}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
