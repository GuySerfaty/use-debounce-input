import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';

interface useDebounceProps {
  value: any,
  delay: number,
}

export const useDebounce = ({ value, delay }: useDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
          clearTimeout(handler);
      };
    },
    [value],
  );

  return debouncedValue;
}

interface UseDebounceInputProps {
  delay: number,
}

interface DebounceInputProps {
  onChange?: (value: any) => void,
}

const getDebounceInput = (setValue: any) => React.memo(({ onChange, ...props }: DebounceInputProps) => {
  const onChangeWarped = ({ target }: { target: HTMLInputElement; }) => {
    const { value } =  target;
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <input
      onChange={onChangeWarped}
      type="text"
      {...props}
    />
  )
})

const useDebounceInput = ({ delay }: UseDebounceInputProps) => {
  const [value, setValue] = useState<String>();
  const debounceValue = useDebounce({
    value,
    delay,
  });


  const DebounceInput = useMemo(() => getDebounceInput(setValue), [])

  return {
    DebounceInput, value, debounceValue, setValue,
  }
};


interface UseDebounceFilterListProps extends UseDebounceInputProps {
  items: any[],
  filterByColumns: string[],
  processingIndicator?: boolean,
  filter?: (filteredBy: String, currentItems: any[], filterByColumns: any[]) => void,
  delay: number,
}

const defaultFilter = (
  debounceValue: any,
  items: UseDebounceFilterListProps["items"],
  filterByColumns: UseDebounceFilterListProps["filterByColumns"]
) => items.filter((item) => {
    return filterByColumns
      .find((column) => String(item[column])
          .toLowerCase().includes(debounceValue.toLowerCase()))
});

export default ({
  delay,
  items,
  filterByColumns, 
  filter = defaultFilter, 
}: UseDebounceFilterListProps) => {
  const [
    filteredItems, 
    setFilterItems,
  ] = useState<any>(items);
  const {
    DebounceInput, value, debounceValue, setValue,
  } = useDebounceInput({
    delay,
  });

  useEffect(() => {
    const search = (currentItems: UseDebounceFilterListProps["items"]) => {
      if (!debounceValue) {
        return currentItems;
      }

      return filter(debounceValue, currentItems, filterByColumns);
    };
    (async () => {
      if (!items) {
        return;
      }
      const results = await search(items);
      setFilterItems(results);
    })()
  }, [debounceValue, items])
  
  return {
    DebounceInput,
    value,
    debounceValue,
    filteredItems: useMemo(() => filteredItems, [filteredItems]),
    setInputValue: useCallback(setValue, []),
  }
};
