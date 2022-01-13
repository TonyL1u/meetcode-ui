import { PropType } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--text-link-default-color'?: string;
        '--text-link-hover-color'?: string;
    }
}

export type TextLinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type TextLinkColorMap = Record<TextLinkType, { color: string; hoverColor: string }>;

export interface TextLinkProps {
    type?: TextLinkType;
    to?: string;
    underline?: boolean;
    block?: boolean;
    trigger?: 'always' | 'hover';
    color?: string;
    hoverColor?: string;
    raw?: boolean;
}

export const textLinkProps = {
    type: {
        type: String as PropType<TextLinkProps['type']>,
        default: 'success'
    },
    to: {
        type: String as PropType<TextLinkProps['to']>,
        default: '#'
    },
    underline: {
        type: Boolean as PropType<TextLinkProps['underline']>,
        default: false
    },
    block: {
        type: Boolean as PropType<TextLinkProps['block']>,
        default: false
    },
    trigger: {
        type: String as PropType<TextLinkProps['trigger']>,
        default: 'always'
    },
    color: {
        type: String as PropType<TextLinkProps['color']>,
        default: undefined
    },
    hoverColor: {
        type: String as PropType<TextLinkProps['hoverColor']>,
        default: undefined
    },
    raw: {
        type: Boolean as PropType<TextLinkProps['raw']>,
        default: false
    }
};
