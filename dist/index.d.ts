import React from 'react';
interface useDebounceProps {
    value: any;
    delay: number;
}
export declare const useDebounce: ({ value, delay }: useDebounceProps) => any;
interface UseDebounceInputProps {
    delay: number;
}
interface DebounceInputProps {
    onChange?: (value: any) => void;
}
interface UseDebounceFilterListProps extends UseDebounceInputProps {
    items: any[];
    filterByColumns: string[];
    processingIndicator?: boolean;
    filter?: (filteredBy: String, currentItems: any[], filterByColumns: any[]) => void;
    delay: number;
}
declare const _default: ({ delay, items, filterByColumns, filter, }: UseDebounceFilterListProps) => {
    DebounceInput: React.MemoExoticComponent<({ onChange, ...props }: DebounceInputProps) => JSX.Element>;
    value: String | undefined;
    debounceValue: any;
    filteredItems: any;
    setInputValue: React.Dispatch<React.SetStateAction<String | undefined>>;
};
export default _default;
