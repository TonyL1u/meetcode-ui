import type { PropType } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--switch-checked-color'?: string;
        '--switch-unchecked-color'?: string;
        '--switch-handler-color'?: string;
        '--switch-label-border-radius'?: string;
        '--switch-label-handler-border-radius'?: string;
    }
}

export type OnBeforeSwitchImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type SwitchValue = string | number | boolean;
export interface SwitchProps {
    value?: SwitchValue;
    disabled?: boolean;
    checkedValue?: SwitchValue;
    uncheckedValue?: SwitchValue;
    checkedText?: string;
    uncheckedText?: string;
    checkedColor?: string;
    uncheckedColor?: string;
    handlerColor?: string;
    textPlacement?: 'in' | 'out' | 'both';
    square?: boolean;
    checked?: boolean;
    loading?: boolean;
    onBeforeSwitch?: OnBeforeSwitchImpl;
}

export const switchProps = {
    value: {
        type: [String, Number, Boolean] as PropType<SwitchProps['value']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<SwitchProps['disabled']>,
        default: false
    },
    checkedValue: {
        type: [String, Number, Boolean] as PropType<SwitchProps['checkedValue']>,
        default: true
    },
    uncheckedValue: {
        type: [String, Number, Boolean] as PropType<SwitchProps['uncheckedValue']>,
        default: false
    },
    checkedText: {
        type: String as PropType<SwitchProps['checkedText']>,
        default: undefined
    },
    uncheckedText: {
        type: String as PropType<SwitchProps['uncheckedText']>,
        default: undefined
    },
    checkedColor: {
        type: String as PropType<SwitchProps['checkedColor']>,
        default: '#10b981'
    },
    uncheckedColor: {
        type: String as PropType<SwitchProps['uncheckedColor']>,
        default: 'rgba(0, 0, 0, 0.25)'
    },
    handlerColor: {
        type: String as PropType<SwitchProps['handlerColor']>,
        default: undefined
    },
    textPlacement: {
        type: String as PropType<SwitchProps['textPlacement']>,
        default: 'in'
    },
    square: {
        type: Boolean as PropType<SwitchProps['square']>,
        default: false
    },
    checked: {
        type: Boolean as PropType<SwitchProps['checked']>,
        default: false
    },
    loading: {
        type: Boolean as PropType<SwitchProps['loading']>,
        default: false
    },
    onBeforeSwitch: {
        type: Function as PropType<SwitchProps['onBeforeSwitch']>,
        default: undefined
    }
};
