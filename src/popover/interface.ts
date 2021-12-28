import { PropType, VNodeChild } from 'vue';

export type PopoverTrigger = 'hover' | 'click' | 'manual' | 'follow';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end';
export type PopoverTriggerBorder = 'top' | 'right' | 'bottom' | 'left';
export type PopoverOffset = {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
};
export interface PopoverProps {
    trigger: PopoverTrigger;
    placement: PopoverPlacement;
    destroyWhenHide: boolean;
    zIndex?: number;
    show: boolean;
    disabled: boolean;
    withArrow: boolean;
    showDelay: number;
    hideDelay: number;
    offset?: PopoverOffset;
    wrapBoundary: boolean;
    matchTrigger: boolean;
    autoSync: boolean;
    title?: string;
    content?: string | (() => VNodeChild);
}
export interface PopoverExposeInstance {
    syncPosition: () => void;
    show: () => void;
    hide: () => void;
    el: HTMLElement;
}
export const popoverProps = {
    trigger: {
        type: String as PropType<PopoverProps['trigger']>,
        default: 'hover'
    },
    placement: {
        type: String as PropType<PopoverProps['placement']>,
        default: 'top'
    },
    destroyWhenHide: {
        type: Boolean as PropType<PopoverProps['destroyWhenHide']>,
        default: true
    },
    zIndex: {
        type: Number as PropType<PopoverProps['zIndex']>,
        default: undefined
    },
    show: {
        type: Boolean as PropType<PopoverProps['show']>,
        default: false
    },
    disabled: {
        type: Boolean as PropType<PopoverProps['disabled']>,
        default: false
    },
    withArrow: {
        type: Boolean as PropType<PopoverProps['withArrow']>,
        default: true
    },
    showDelay: {
        type: Number as PropType<PopoverProps['showDelay']>,
        default: 100
    },
    hideDelay: {
        type: Number as PropType<PopoverProps['hideDelay']>,
        default: 100
    },
    offset: {
        type: Object as PropType<PopoverProps['offset']>,
        default: undefined
    },
    wrapBoundary: {
        type: Boolean as PropType<PopoverProps['wrapBoundary']>,
        default: false
    },
    matchTrigger: {
        type: Boolean as PropType<PopoverProps['matchTrigger']>,
        default: false
    },
    autoSync: {
        type: Boolean as PropType<PopoverProps['autoSync']>,
        default: true
    },
    title: {
        type: String as PropType<PopoverProps['title']>,
        default: undefined
    },
    content: {
        type: [String, Function] as PropType<PopoverProps['content']>,
        default: undefined
    }
};
