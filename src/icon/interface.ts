import { PropType } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--icon-color'?: string;
        '--icon-font-size'?: string;
    }
}

export interface IconProps {
    size?: number;
    color?: string;
    spin?: boolean;
}

export const iconProps = {
    size: {
        type: Number as PropType<IconProps['size']>,
        default: undefined
    },
    color: {
        type: String as PropType<IconProps['color']>,
        default: undefined
    },
    spin: {
        type: Boolean as PropType<IconProps['spin']>,
        default: false
    }
};
