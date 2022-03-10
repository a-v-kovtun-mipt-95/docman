import { useState } from "react";

export interface InputModel<T> {
    getValue: () => T | undefined;
    setValue: (value: T | undefined) => void;
}

export interface SelectModel<T> extends InputModel<T> {
    getLabel: () => string;
    getItems: () => { value: T | undefined; label: string; }[];
    setItems: (items: { value: T | undefined; label: string; }[]) => void;
}

export function useInputModel<T>(defaultValue: T | undefined): InputModel<T> {
    const [value, setValue] = useState(defaultValue);
    return {
        getValue: () => value,
        setValue: setValue,
    };
}

export function useSelectModel<T>(
    defaultValue: { value: T | undefined; label: string; },
    defaultItems: { value: T | undefined; label: string; }[]
): SelectModel<T> {
    const [value, setValue] = useState(defaultValue);
    const [items, setItems] = useState(defaultItems);

    function checkAndSetValue(value: T | undefined) {
        const filteredItems = items.filter((item) => item.value === value);
        if(filteredItems.length > 0) {
            setValue({value: value, label: filteredItems[0].label});
        }
    }

    return {
        getLabel: () => value.label,
        getValue: () => value.value,
        setValue: checkAndSetValue,
        getItems: () => items,
        setItems: setItems,
    };
}