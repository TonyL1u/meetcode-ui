import { Ref, VNodeChild, ComputedRef } from 'vue';
import type { ObjectEmitsOptions } from 'vue';
import { ModalExposeInstance, ModalProps, ModalObjectEmits } from '../modal';

export interface PopupModalSlots {
    header?: () => VNodeChild;
    footer?: () => VNodeChild;
}
export type PopupModalConfig = Omit<ModalProps, 'show'> & ModalObjectEmits & { slots?: PopupModalSlots };
export interface PopupSourceOptions<P extends Record<string, any>, E extends ObjectEmitsOptions> {
    props?: {
        [K in keyof P]: Ref<P[K]> | P[K];
    };
    on?: E;
}

export interface PopupInstance {
    show: (config?: PopupModalConfig) => void;
    hide: () => void;
    instance: Ref<ModalExposeInstance | undefined>;
}
