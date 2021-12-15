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

type InternalBus = Record<string, UseEventBusReturn<any>>;
export interface CheckboxGroupInjection {
    groupValue?: Ref<CheckboxValue[] | undefined>;
    groupCheckedColor: Ref<string>;
    groupDisabled: Ref<boolean>;
    updateGroupValue: (value?: CheckboxValue) => void;
    SelectAllBus: UseEventBusReturn<boolean>;
    UpdateDisabledBus: UseEventBusReturn<boolean>;
}
export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupInjection> = Symbol();
export type CheckboxValue = string | number | boolean;
export type CheckboxSize = 'small' | 'medium' | 'large';
export interface CheckboxGroupOptions {
    value: CheckboxValue;
    label: string;
}
export interface CheckboxProps {
    value: CheckboxValue;
    size?: CheckboxSize;
    label?: string;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
}
