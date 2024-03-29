import type { PropType, CSSProperties } from 'vue';

export interface SpaceProps {
    vertical?: boolean;
    gap?: number;
    itemStyle?: string | CSSProperties;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
}

export const spaceProps = {
    vertical: {
        type: Boolean as PropType<SpaceProps['vertical']>,
        default: false
    },
    gap: {
        type: Number as PropType<SpaceProps['gap']>,
        default: 12
    },
    itemStyle: {
        type: [String, Object] as PropType<SpaceProps['itemStyle']>,
        default: undefined
    },
    justify: {
        type: String as PropType<SpaceProps['justify']>,
        default: 'flex-start'
    }
};
