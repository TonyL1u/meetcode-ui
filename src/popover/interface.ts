import { PropType, VNodeChild, Ref, InjectionKey, CSSProperties } from 'vue';

export type PopoverTrigger = 'hover' | 'click' | 'manual' | 'follow';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end';
export type PopoverTriggerBorder = 'top' | 'right' | 'bottom' | 'left';
export type PopoverFollowMode = 'move' | 'click';
export type PopoverOffset = {
    top?: CSSProperties['top'];
    right?: CSSProperties['right'];
    bottom?: CSSProperties['bottom'];
    left?: CSSProperties['left'];
};
export type PopoverInjection = Ref<HTMLElement | null> | null;
export interface PopoverExposeInstance {
    syncPosition: () => void;
    show: () => void;
    hide: () => void;
    el: HTMLElement;
}
export interface PopoverProps {
    trigger?: PopoverTrigger;
    placement?: PopoverPlacement;
    destroyWhenHide?: boolean;
    zIndex?: number;
    show?: boolean;
    disabled?: boolean;
    withArrow?: boolean;
    showDelay?: number;
    hideDelay?: number;
    offset?: PopoverOffset;
    wrapBoundary?: boolean;
    matchTrigger?: boolean;
    autoSync?: boolean;
    title?: string;
    content?: string | (() => VNodeChild);
    followMode?: PopoverFollowMode;
    x?: number;
    y?: number;
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
        default: 75
    },
    hideDelay: {
        type: Number as PropType<PopoverProps['hideDelay']>,
        default: 75
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
    },
    followMode: {
        type: String as PropType<PopoverProps['followMode']>,
        default: 'move'
    },
    x: {
        type: Number as PropType<PopoverProps['x']>,
        default: undefined
    },
    y: {
        type: Number as PropType<PopoverProps['y']>,
        default: undefined
    }
};
export const popoverEmits = ['show', 'hide', 'update:show', 'border-reached'];
export const popoverInjectionKey: InjectionKey<PopoverInjection> = Symbol('popoverInjectionKey');
