import { InjectionKey, Ref } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--checkbox-checked-color'?: string;
        '--checkbox-hover-color'?: string;
    }
}

interface CheckboxGroupInjection {
    groupValue?: CheckboxValue[];
    updateGroupValue: (value?: CheckboxValue) => void;
    groupCheckedColor: string;
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
}
