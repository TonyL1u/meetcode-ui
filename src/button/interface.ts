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
    }
}
type ButtonStatus = 'default' | 'hover';
export interface ButtonColorSet {
    color: string;
    borderColor: string;
    backgroundColor: string;
}
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonColorMap = Record<ButtonType, Record<ButtonStatus, ButtonColorSet>>;

export interface ButtonProps {
    type?: ButtonType;
}

export const buttonProps = {
    type: {
        type: String as PropType<ButtonProps['type']>,
        default: 'default'
    }
};
