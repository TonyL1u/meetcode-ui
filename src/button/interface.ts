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
        '--button-height'?: string;
        '--button-padding'?: string;
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
}

export type ButtonStatus = 'default' | 'hover' | 'active' | 'disabled';
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ButtonColorMap = Record<ButtonType, Record<ButtonStatus, ButtonColorSet>>;
export type ButtonSizeMap = Record<ButtonSize, ButtonSizeSet>;

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    ghost?: boolean;
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
        defatul: false
    }
};
