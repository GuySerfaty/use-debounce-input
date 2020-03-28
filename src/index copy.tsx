import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';

export const useDebounce = (value: any, delay: number) => {
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

interface DebounceInputProps {
  onChange: (value: any) => void,
  onChangeStart?: () => void,
  onChangeEnd?: () => void,
  delay?: number,
  minLength?: number,
}

export const DebounceInput = React.memo(({ onChangeStart, onChangeEnd, onChange, delay, minLength, ...props }: DebounceInputProps) => {
  const [value, setValue] = useState<String>();
  const debounceValue = useDebounce(value, delay !== undefined ? delay : 500);
  useEffect(() => {
      onChange(debounceValue);
      if (onChangeEnd) {
        onChangeEnd();
      }
  }, [debounceValue]);

  useEffect(() => {
    if (value && onChangeStart) {
      onChangeStart();
    }
  }, [value])

  const onSearch = ({ target }: { target: HTMLInputElement; }) => {
    const { value } =  target;
    if (minLength && minLength > value.length) {
      return;
    }
    setValue(value);
  };
  return <input
          onChange={onSearch}
          type="text"
          {...props}
      />
});

interface UseDebounceFilterProps {
  items: any[],
  searchColumns: any[],
  processingIndicator?: boolean,
  filter?: (filteredBy: String, currentItems: any[], searchColumns: any[]) => void,
}

export default ({ items = [], searchColumns, processingIndicator, filter }: UseDebounceFilterProps) => {
  const [filteredBy, setFilter] = useState('');
  const [filteredItems, setFilterItems] = useState<any>(items);
  const [processing, setProcessing] = useState(false);
  const search = useCallback((currentItems: UseDebounceFilterProps["items"]) => {
    if (!filteredBy) {
      return currentItems;
    }
    if (filter) {
      return filter(filteredBy, currentItems, searchColumns);
    }
    return currentItems.filter((item) => {
      return searchColumns
        .find((column) => String(item[column])
            .toLowerCase().includes(filteredBy.toLowerCase()))
    });
  }, [filteredBy]);

  const Search = useMemo(() => {
      console.log('Search rendered')
      return ({ onChange, ...props }: DebounceInputProps) => {
        const wrappedOnChange = (value: any) => {
          setFilter(value);
          if (onChange) {
            onChange(value)
          }
        }
        return <DebounceInput
          {...props}
          onChange={wrappedOnChange}
          onChangeEnd={() => processingIndicator && setProcessing(false)}
          onChangeStart={() => processingIndicator && setProcessing(old => old || true)}
        />
      }
  }, []);
  useEffect(() => {
      // debugger;
      (async () => {
        const results = await search(items);
        setFilterItems(results);
      })()
  }, [items, filteredBy]);
  // console.log('itemss', filteredItems)
  return {
      Search, filteredItems, filteredBy,
      processing,
      // filter,
  };
};
