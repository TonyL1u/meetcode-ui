import { PropType } from 'vue';
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

export interface ButtonColorSet {
    color: string;
    borderColor: string;
    backgroundColor: string;
}
export interface ButtonSizeSet {
    height: string;
    padding: string;
    fontSize: string;
    iconSize: string;
    iconMargin: string;
}

export type ButtonStatus = 'default' | 'hover' | 'active' | 'disabled';
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ButtonRender = 'normal' | 'text' | 'link';
export type ButtonColorRecord = Record<ButtonStatus, ButtonColorSet>;
export type ButtonColorMap = Record<ButtonType, ButtonColorRecord>;
export type ButtonSizeMap = Record<ButtonSize, ButtonSizeSet>;

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
    color?: string;
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
    }
};
