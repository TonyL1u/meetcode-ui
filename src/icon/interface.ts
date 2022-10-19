import type { PropType, Component } from 'vue';

export interface IconProps {
    size?: number;
    color?: string;
    spin?: boolean;
    speed?: 'slow' | 'normal' | 'fast';
    icon?: Component;
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
    },
    speed: {
        type: String as PropType<IconProps['speed']>,
        default: 'normal'
    },
    icon: {
        type: Object as PropType<IconProps['icon']>,
        default: undefined
    }
};
