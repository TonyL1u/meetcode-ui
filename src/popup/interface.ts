import { Ref, VNodeChild, InjectionKey } from 'vue';
import type { ObjectEmitsOptions } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { ModalExposeInstance, ModalProps, ModalObjectEmits } from '../modal';
import { DrawerExposeInstance, DrawerProps, DrawerObjectEmits } from '../drawer';

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
    autoDestroy?: boolean;
}
export interface PopupInstance {
    show(): void;
    show<T extends PopupType>(type: T): void;
    show(config: PopupModalConfig): void;
    show<T extends PopupType>(type: T, config: T extends 'modal' ? PopupModalConfig : PopupDrawerConfig): void;
    hide: () => void;
    destroy: () => void;
    instance: Ref<ModalExposeInstance | DrawerExposeInstance | undefined | null>;
}
export const popupRouteInjectionKey: InjectionKey<RouteLocationNormalizedLoaded> = Symbol('popupRouteInjectionKey');
