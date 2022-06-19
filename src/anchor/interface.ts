import type { VNodeChild, PropType, RenderFunction } from 'vue';

export interface AnchorOption {
    title?: string | RenderFunction;
    href: string;
    children?: AnchorOption[];
}

export interface AnchorExposeInstance {
    el: HTMLElement;
    scrollTo: (href: string) => void;
}

export interface AnchorProps {
    options?: AnchorOption[];
    bound?: number;
    offsetTop?: number;
    offsetBottom?: number;
    type?: 'background' | 'bar';
    showTrack?: boolean;
    showMarker?: boolean;
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
        default: 5
    },
    offsetBottom: {
        type: Number as PropType<AnchorProps['offsetBottom']>,
        default: 5
    },
    type: {
        type: String as PropType<AnchorProps['type']>,
        default: 'background'
    },
    showTrack: {
        type: Boolean as PropType<AnchorProps['showTrack']>,
        default: true
    },
    showMarker: {
        type: Boolean as PropType<AnchorProps['showMarker']>,
        default: true
    }
};
