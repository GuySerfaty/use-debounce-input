import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';

export const useDebounce = ({ value, delay }: {
  value: any,
  delay: number,
}) => {
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

const getDebounceInput = (setValue: any) => React.memo(({ onChange, ...props }: {
  onChange?: (value: any) => void,
}) => {
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

const defaultFilter = (
  debounceValue: any,
  items: any[],
  filterByColumns: string[]
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
} : {
  items: any[],
  filterByColumns: string[],
  processingIndicator?: boolean,
  filter?: (filteredBy: String, currentItems: any[], filterByColumns: any[]) => void,
  delay: number,
}) => {
  const [
    filteredItems, 
    setFilterItems,
  ] = useState<any>(items);

  const [value, setValue] = useState<String>();
  const debounceValue = useDebounce({
    value,
    delay,
  });

  const DebounceInput = useMemo(() => getDebounceInput(setValue), [])

  useEffect(() => {
    const search = (currentItems: any[]) => {
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
