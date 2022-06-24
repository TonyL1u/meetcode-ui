import type { PropType, RenderFunction } from 'vue';
import type { UISize, UnionOmit } from '../_utils_';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--switch-font-size'?: string;
        '--switch-checked-color'?: string;
        '--switch-unchecked-color'?: string;
        '--switch-handler-color'?: string;
        '--switch-ripple-color'?: string;
        '--switch-label-height'?: string;
        '--switch-label-min-width'?: string;
        '--switch-label-border-radius'?: string;
        '--switch-text-checked-padding'?: string;
        '--switch-text-unchecked-padding'?: string;
        '--switch-handler-size'?: string;
        '--switch-handler-border-radius'?: string;
    }
}

export interface SwitchSizeSet {
    labelHeight: string;
    labelMinWidth: string;
    fontSize: string;
    handlerSize: string;
    textCheckedPadding: string;
    textUncheckedPadding: string;
}
export type OnBeforeSwitchImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type SwitchSize = UnionOmit<UISize, 'mini'>;
export type SwitchValue = string | number | boolean;
export type SwitchSizeMap = Record<SwitchSize, SwitchSizeSet>;
export interface SwitchProps {
    value?: SwitchValue;
    disabled?: boolean;
    size?: SwitchSize;
    checkedValue?: SwitchValue;
    uncheckedValue?: SwitchValue;
    checkedText?: string | RenderFunction;
    uncheckedText?: string | RenderFunction;
    checkedColor?: string;
    uncheckedColor?: string;
    handlerColor?: string;
    textPlacement?: 'in' | 'out' | 'both';
    square?: boolean;
    checked?: boolean;
    loading?: boolean;
    inelastic?: boolean;
    onBeforeSwitch?: OnBeforeSwitchImpl;
}
export interface SwitchExposeInstance {
    el: HTMLElement;
    switch: () => void;
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
    size: {
        type: String as PropType<SwitchProps['size']>,
        default: 'medium'
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
        default: undefined
    },
    uncheckedColor: {
        type: String as PropType<SwitchProps['uncheckedColor']>,
        default: undefined
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
    inelastic: {
        type: Boolean as PropType<SwitchProps['inelastic']>,
        default: false
    },
    onBeforeSwitch: {
        type: Function as PropType<SwitchProps['onBeforeSwitch']>,
        default: undefined
    }
};
