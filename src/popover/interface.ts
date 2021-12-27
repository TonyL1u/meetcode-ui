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
export interface PopoverBaseProps {
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
        type: String as PropType<PopoverBaseProps['trigger']>,
        default: 'hover'
    },
    placement: {
        type: String as PropType<PopoverBaseProps['placement']>,
        default: 'top'
    },
    destroyWhenHide: {
        type: Boolean as PropType<PopoverBaseProps['destroyWhenHide']>,
        default: true
    },
    zIndex: {
        type: Number as PropType<PopoverBaseProps['zIndex']>,
        default: undefined
    },
    show: {
        type: Boolean as PropType<PopoverBaseProps['show']>,
        default: false
    },
    disabled: {
        type: Boolean as PropType<PopoverBaseProps['disabled']>,
        default: false
    },
    withArrow: {
        type: Boolean as PropType<PopoverBaseProps['withArrow']>,
        default: true
    },
    showDelay: {
        type: Number as PropType<PopoverBaseProps['showDelay']>,
        default: 100
    },
    hideDelay: {
        type: Number as PropType<PopoverBaseProps['hideDelay']>,
        default: 100
    },
    offset: {
        type: Object as PropType<PopoverBaseProps['offset']>,
        default: undefined
    },
    wrapBoundary: {
        type: Boolean as PropType<PopoverBaseProps['wrapBoundary']>,
        default: false
    },
    matchTrigger: {
        type: Boolean as PropType<PopoverBaseProps['matchTrigger']>,
        default: false
    },
    autoSync: {
        type: Boolean as PropType<PopoverBaseProps['autoSync']>,
        default: true
    },
    title: {
        type: String as PropType<PopoverBaseProps['title']>,
        default: undefined
    },
    content: {
        type: [String, Function] as PropType<PopoverBaseProps['content']>,
        default: undefined
    }
};
