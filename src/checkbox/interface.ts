import { InjectionKey, Ref } from 'vue';
import { useEventBus, UseEventBusReturn } from '@vueuse/core';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--checkbox-checked-color'?: string;
        '--checkbox-hover-color'?: string;
    }
}

type InternalBus = Record<string, UseEventBusReturn<any>>;
export interface CheckboxGroupInjection {
    groupValue?: Ref<CheckboxValue[] | undefined>;
    groupCheckedColor: Ref<string>;
    groupDisabled: Ref<boolean>;
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
}

export const checkboxInternalEmitter: InternalBus = {
    CheckedBus: useEventBus<boolean>('update-internal-checked'),
    DisabledBus: useEventBus<boolean>('update-internal-disabled')
};
