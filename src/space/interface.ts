import type { PropType, CSSProperties } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--space-direction'?: string;
        '--space-justify'?: string;
        '--space-item-gap'?: string;
    }
}

export interface SpaceProps {
    vertical?: boolean;
    gap?: number;
    itemStyle?: string | CSSProperties;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-round' | 'space-between' | 'space-evenly';
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
