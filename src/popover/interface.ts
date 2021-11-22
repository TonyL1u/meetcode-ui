export type PopoverTrigger = 'hover' | 'click' | 'manual' | 'follow';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end';
export type PopoverTriggerBorder = 'top' | 'right' | 'bottom' | 'left';
export interface PopoverBaseProps {
    trigger?: PopoverTrigger;
    placement?: PopoverPlacement;
    destroyWhenHide?: boolean;
    zIndex?: number;
    show?: boolean;
    disabled?: boolean;
    withArrow?: boolean;
    showDelay?: number;
    hideDelay?: number;
    offset?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    wrapBoundary?: boolean;
    matchTrigger?: boolean;
    autoSync?: boolean;
    title?: string;
}
export interface PopoverExposeInstance {
    syncPosition: () => void;
    show: () => void;
    hide: () => void;
    el: HTMLElement;
}
