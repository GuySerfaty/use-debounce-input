import * as React from 'react';
export declare const useDebounce: ({ value, delay }: {
    value: any;
    delay: number;
}) => any;
declare const _default: ({ delay, items, filterByColumns, filter, }: {
    items: any[];
    filterByColumns: string[];
    processingIndicator?: boolean | undefined;
    filter?: ((filteredBy: String, currentItems: any[], filterByColumns: any[]) => void) | undefined;
    delay: number;
}) => {
    DebounceInput: React.MemoExoticComponent<({ onChange, ...props }: {
        onChange?: ((value: any) => void) | undefined;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
    value: String | undefined;
    debounceValue: any;
    filteredItems: any;
    setInputValue: React.Dispatch<React.SetStateAction<String | undefined>>;
};
export default _default;
