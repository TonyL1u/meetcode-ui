import { Prop, PropType } from 'vue';
import { UIStatus, UISize, UIColorAttrs } from '../_utils_';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--button-default-color'?: string;
        '--button-default-border-color'?: string;
        '--button-default-background-color'?: string;
        '--button-hover-color'?: string;
        '--button-hover-border-color'?: string;
        '--button-hover-background-color'?: string;
        '--button-active-color'?: string;
        '--button-active-border-color'?: string;
        '--button-active-background-color'?: string;
        '--button-disabled-color'?: string;
        '--button-disabled-border-color'?: string;
        '--button-disabled-background-color'?: string;
        '--button-width'?: string;
        '--button-height'?: string;
        '--button-padding'?: string;
        '--button-font-size'?: string;
        '--button-icon-size'?: string;
        '--button-icon-margin'?: string;
        '--button-radius'?: string;
        '--button-ripple-color'?: string;
        '--button-flex-direction'?: string;
    }
}

export interface ButtonSizeSet {
    height: string;
    padding: string;
    fontSize: string;
    iconSize: string;
    iconMargin: string;
}
export const buttonIKey = Symbol('button');
export type ButtonSize = UISize;
export type ButtonStatus = UIStatus;
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'custom';
export type ButtonRender = 'normal' | 'text' | 'link';
export type ButtonColorSet = Pick<UIColorAttrs, 'color' | 'borderColor' | 'backgroundColor'>;
export type ButtonSizeMap = Record<ButtonSize, ButtonSizeSet>;

export interface ButtonExposeInstance {
    el: HTMLButtonElement;
}

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    ghost?: boolean;
    dashed?: boolean;
    render?: ButtonRender;
    round?: boolean;
    circle?: boolean;
    block?: boolean;
    loading?: boolean;
    iconRight?: boolean;
    color?: string;
    textColor?: string;
    borderColor?: string;
    colorSet?: Partial<Record<ButtonStatus, string>>;
    textColorSet: Partial<Record<ButtonStatus, string>>;
    borderColorSet: Partial<Record<ButtonStatus, string>>;
}

export interface ButtonGroupProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    ghost?: boolean;
    dashed?: boolean;
    render?: ButtonRender;
    vertical?: boolean;
}

export const buttonProps = {
    type: {
        type: String as PropType<ButtonProps['type']>,
        default: 'default'
    },
    size: {
        type: String as PropType<ButtonProps['size']>,
        default: 'medium'
    },
    disabled: {
        type: Boolean as PropType<ButtonProps['disabled']>,
        default: false
    },
    ghost: {
        type: Boolean as PropType<ButtonProps['ghost']>,
        default: false
    },
    dashed: {
        type: Boolean as PropType<ButtonProps['dashed']>,
        default: false
    },
    render: {
        type: String as PropType<ButtonProps['render']>,
        default: 'normal'
    },
    round: {
        type: Boolean as PropType<ButtonProps['round']>,
        default: false
    },
    circle: {
        type: Boolean as PropType<ButtonProps['circle']>,
        default: false
    },
    loading: {
        type: Boolean as PropType<ButtonProps['loading']>,
        default: false
    },
    block: {
        type: Boolean as PropType<ButtonProps['block']>,
        default: false
    },
    iconRight: {
        type: Boolean as PropType<ButtonProps['iconRight']>,
        default: false
    },
    color: {
        type: String as PropType<ButtonProps['color']>,
        default: undefined
    },
    textColor: {
        type: String as PropType<ButtonProps['textColor']>,
        default: undefined
    },
    borderColor: {
        type: String as PropType<ButtonProps['borderColor']>,
        default: undefined
    },
    colorSet: {
        type: Object as PropType<ButtonProps['colorSet']>,
        default: undefined
    },
    textColorSet: {
        type: Object as PropType<ButtonProps['textColorSet']>,
        default: undefined
    },
    borderColorSet: {
        type: Object as PropType<ButtonProps['borderColorSet']>,
        default: undefined
    }
};

export const buttonGroupProps = {
    type: {
        type: String as PropType<ButtonGroupProps['type']>,
        default: 'default'
    },
    size: {
        type: String as PropType<ButtonGroupProps['size']>,
        default: 'medium'
    },
    disabled: {
        type: Boolean as PropType<ButtonGroupProps['disabled']>,
        default: false
    },
    ghost: {
        type: Boolean as PropType<ButtonGroupProps['ghost']>,
        default: false
    },
    dashed: {
        type: Boolean as PropType<ButtonGroupProps['dashed']>,
        default: false
    },
    render: {
        type: String as PropType<ButtonGroupProps['render']>,
        default: 'normal'
    },
    vertical: {
        type: Boolean as PropType<ButtonGroupProps['vertical']>,
        default: false
    }
};
