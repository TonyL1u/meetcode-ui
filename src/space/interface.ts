import { PropType } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--space-direction'?: string;
        '--space-item-gap'?: string;
    }
}

export interface SpaceProps {
    vertical?: boolean;
    gap?: number;
    itemStyle?: string | Partial<CSSStyleDeclaration>;
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
    }
};
