import React from 'react';
export declare const useDebounce: (value: any, delay: number) => any;
interface DebounceInputProps {
    onChange: (value: any) => void;
    onChangeStart?: () => void;
    onChangeEnd?: () => void;
    delay?: number;
    minLength?: number;
}
export declare const DebounceInput: React.MemoExoticComponent<({ onChangeStart, onChangeEnd, onChange, delay, minLength, ...props }: DebounceInputProps) => JSX.Element>;
interface UseDebounceFilterProps {
    items: any[];
    searchColumns: any[];
    processingIndicator?: boolean;
    filter?: (filteredBy: String, currentItems: any[], searchColumns: any[]) => void;
}
declare const _default: ({ items, searchColumns, processingIndicator, filter }: UseDebounceFilterProps) => {
    Search: ({ onChange, ...props }: DebounceInputProps) => JSX.Element;
    filteredItems: any;
    filteredBy: string;
    processing: boolean;
};
export default _default;
