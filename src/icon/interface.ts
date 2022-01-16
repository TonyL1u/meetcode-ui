import { PropType } from 'vue';

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
        default: 'inherit'
    },
    spin: {
        type: Boolean as PropType<IconProps['spin']>,
        default: false
    }
};
