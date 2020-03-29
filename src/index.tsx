import * as React from 'react';

export const useDebounce = ({ value, delay }: {
  value: any,
  delay: number,
}) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(
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
  return React.createElement('input', {
    onChange: onChangeWarped,
    type: "text",
    ...props
  });
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
  ] = React.useState<any>(items);

  const [value, setValue] = React.useState<String>();
  const debounceValue = useDebounce({
    value,
    delay,
  });

  const DebounceInput = React.useMemo(() => getDebounceInput(setValue), [])

  React.useEffect(() => {
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
    filteredItems: React.useMemo(() => filteredItems, [filteredItems]),
    setInputValue: React.useCallback(setValue, []),
  }
};
