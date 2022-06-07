import type { VNodeChild, PropType } from 'vue';

export interface AnchorOption {
    title?: string | (() => VNodeChild);
    href: string;
    children?: AnchorOption[];
}

export interface AnchorProps {
    options?: AnchorOption[];
    bound?: number;
    offsetTop?: number;
    offsetBottom?: number;
    type?: 'background' | 'bar';
    showTrack?: boolean;
}

export const anchorProps = {
    options: {
        type: Array as PropType<AnchorProps['options']>,
        default: undefined
    },
    bound: {
        type: Number as PropType<AnchorProps['bound']>,
        default: 0
    },
    offsetTop: {
        type: Number as PropType<AnchorProps['offsetTop']>,
        default: 0
    },
    offsetBottom: {
        type: Number as PropType<AnchorProps['offsetBottom']>,
        default: 0
    },
    type: {
        type: String as PropType<AnchorProps['type']>,
        default: 'background'
    },
    showTrack: {
        type: Boolean as PropType<AnchorProps['showTrack']>,
        default: true
    }
};
