import { Ref } from 'vue';
import type { ObjectEmitsOptions } from 'vue';
import { ModalExposeInstance, ModalProps, ModalObjectEmits } from '../modal';

export type PopupModalConfig = Omit<ModalProps, 'show'> & ModalObjectEmits;
export interface PopupSourceOptions<P extends Record<string, any>, E extends ObjectEmitsOptions> {
    props?: P;
    on?: E;
}

export interface PopupInstance {
    show: (config?: PopupModalConfig) => void;
    hide: () => void;
    instance: Ref<ModalExposeInstance | undefined>;
}
