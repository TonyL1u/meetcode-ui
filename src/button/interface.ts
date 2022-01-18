import { PropType } from 'vue';
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
    }
}

export interface ButtonColorSet extends UIColorAttrs {}
export interface ButtonSizeSet {
    height: string;
    padding: string;
    fontSize: string;
    iconSize: string;
    iconMargin: string;
}

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'custom';
export type ButtonRender = 'normal' | 'text' | 'link';
export type ButtonSizeMap = Record<UISize, ButtonSizeSet>;

export interface ButtonProps {
    type?: ButtonType;
    size?: UISize;
    disabled?: boolean;
    ghost?: boolean;
    dashed?: boolean;
    render?: ButtonRender;
    round?: boolean;
    circle?: boolean;
    block?: boolean;
    color?: string;
    textColor?: string;
    borderColor?: string;
    colorSet?: Partial<Record<UIStatus, string>>;
    borderColorSet: Partial<Record<UIStatus, string>>;
    backgroundColorSet: Partial<Record<UIStatus, string>>;
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
    block: {
        type: Boolean as PropType<ButtonProps['block']>,
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
    }
};
