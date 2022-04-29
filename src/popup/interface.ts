import { Component, Ref } from 'vue';
import { ModalExposeInstance, ModalProps } from '../modal';

export interface PopupOptions<T> {
    show?: boolean;
    props?: T;
    modalProps?: ModalProps;
    on?: Record<string, any>;
}

export type PopupApi<T> = (
    source: Component,
    options?: PopupOptions<T>
) => {
    show: () => void;
    instance: Ref<ModalExposeInstance | undefined>;
};
