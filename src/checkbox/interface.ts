import { InjectionKey, Ref } from 'vue';
import { UseEventBusReturn } from '@vueuse/core';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--checkbox-checked-color'?: string;
        '--checkbox-hover-color'?: string;
        '--checkbox-scale-size'?: string;
    }
}

export interface CheckboxGroupInjection {
    groupValue?: Ref<CheckboxValue[] | undefined>;
    groupCheckedColor: Ref<string>;
    groupDisabled: Ref<boolean>;
    updateGroupValue: (value?: CheckboxValue) => void;
    SelectAllBus: UseEventBusReturn<boolean>;
    UpdateDisabledBus: UseEventBusReturn<boolean>;
}
export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupInjection> = Symbol();
export const checkboxIKey = Symbol('checbox');
export type CheckboxValue = string | number | boolean;
export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxGroupStatus = {
    selectAll: boolean;
    indeterminate: boolean;
};
export interface CheckboxGroupOptions {
    value: CheckboxValue;
    label: string;
}
export interface CheckboxProps {
    value?: CheckboxValue;
    label?: string;
    size?: CheckboxSize;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
    indeterminate?: boolean;
    checkedColor?: string;
}
