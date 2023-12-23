'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Option = {
  value: string;
  label: string;
};

type propsFilterSelect = {
  options: Option[];
  placeholder: string;
  name: string;
  defaultValue?: string;
};

const FilterSelect = ({
  placeholder,
  defaultValue,
  options,
  name,
}: propsFilterSelect) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const onSelect = (value: string) => {
    if (params.get(name)) {
      params.delete(name);
    }
    params.set(name, value);
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue}>
      <SelectTrigger className=' w-[236px] xl:w-[122px] xl:h-[42px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
