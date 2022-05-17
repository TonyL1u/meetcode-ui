import type { InjectionKey, Ref, VNodeChild, PropType } from 'vue';
import type { UseEventBusReturn } from '@vueuse/core';
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
    groupCheckedColor: Ref<string | undefined>;
    groupDisabled: Ref<boolean | undefined>;
    updateGroupValue: (value?: CheckboxValue, call?: boolean) => void;
    BusSelectAll: UseEventBusReturn<boolean, any>;
    BusMaxControl: UseEventBusReturn<boolean, any>;
}
export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupInjection> = Symbol();
export const checkboxIKey = Symbol('checkbox');
export type CheckboxValue = string | number | boolean;
export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxGroupStatus = {
    all: boolean;
    indeterminate: boolean;
};
export interface CheckboxGroupOptions {
    value?: CheckboxValue;
    label?: string | (() => VNodeChild);
    disabled?: boolean;
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
export interface CheckboxGroupProps {
    value?: CheckboxValue[];
    options?: CheckboxGroupOptions[];
    max?: number;
    disabled?: boolean;
    checkedColor?: string;
}
export interface CheckboxGroupExposeInstance {
    selectAll: (selectDisabled?: boolean) => void;
    clear: () => void;
    status: CheckboxGroupStatus;
    el: HTMLElement;
}

export const checkboxProps = {
    value: {
        type: [String, Number, Boolean] as PropType<CheckboxProps['value']>,
        default: undefined
    },
    label: {
        type: String as PropType<CheckboxProps['label']>,
        default: undefined
    },
    size: {
        type: String as PropType<CheckboxProps['size']>,
        default: 'medium'
    },
    checkedValue: {
        type: [String, Number, Boolean] as PropType<CheckboxProps['checkedValue']>,
        default: true
    },
    uncheckedValue: {
        type: [String, Number, Boolean] as PropType<CheckboxProps['uncheckedValue']>,
        default: false
    },
    disabled: {
        type: Boolean as PropType<CheckboxProps['disabled']>,
        default: false
    },
    indeterminate: {
        type: Boolean as PropType<CheckboxProps['indeterminate']>,
        default: false
    },
    checkedColor: {
        type: String as PropType<CheckboxProps['checkedColor']>,
        default: undefined
    }
};

export const checkboxGroupPros = {
    value: {
        type: Array as PropType<CheckboxGroupProps['value']>,
        default: undefined
    },
    options: {
        type: Array as PropType<CheckboxGroupProps['options']>,
        default: undefined
    },
    max: {
        type: Number as PropType<CheckboxGroupProps['max']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<CheckboxGroupProps['disabled']>,
        default: false
    },
    checkedColor: {
        type: String as PropType<CheckboxGroupProps['checkedColor']>,
        default: '#10b981'
    }
};
