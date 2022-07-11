import type { Ref, VNodeChild, ObjectEmitsOptions, Plugin } from 'vue';
import type { ModalExposeInstance, ModalProps, ModalObjectEmits } from '../modal';
import type { DrawerExposeInstance, DrawerProps, DrawerObjectEmits } from '../drawer';

export type PopupType = 'modal' | 'drawer';
export interface PopupModalSlots {
    header?: () => VNodeChild;
    footer?: () => VNodeChild;
}
export interface PopupDrawerSlots {
    header?: () => VNodeChild;
}
export type PopupModalConfig = Omit<ModalProps, 'show'> & ModalObjectEmits & { slots?: PopupModalSlots };
export type PopupDrawerConfig = Omit<DrawerProps, 'show'> & DrawerObjectEmits & { slots?: PopupDrawerSlots };
export interface PopupSourceOptions<P extends Record<string, any>, E extends ObjectEmitsOptions> {
    props?: {
        [K in keyof P]: Ref<P[K]> | P[K];
    };
    on?: E;
    plugins?: Plugin[];
    autoDestroy?: boolean;
}
export interface PopupInstance {
    show(): void;
    show<T extends PopupType>(type: T): void;
    show(config: PopupModalConfig & Record<string, any>): void;
    show<T extends PopupType>(type: T, config: (T extends 'modal' ? PopupModalConfig : PopupDrawerConfig) & Record<string, any>): void;
    hide: () => void;
    destroy: () => void;
    instance: Ref<ModalExposeInstance | DrawerExposeInstance | undefined | null>;
}
