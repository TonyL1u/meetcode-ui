import { InjectionKey, Ref } from 'vue';

interface CheckboxGroupInjection {
    groupValue?: CheckboxValue[];
    updateGroupValue: (value?: CheckboxValue) => void;
}
export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupInjection> = Symbol();
export type CheckboxValue = string | number | boolean;
export interface CheckboxGroupOptions {
    value: CheckboxValue;
    label: string;
}
export interface CheckboxProps {
    value: CheckboxValue;
    label?: string;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
    checked?: boolean;
}
