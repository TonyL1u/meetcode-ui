import { PropType, VNodeChild } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--modal-width'?: string;
        '--modal-height'?: string;
    }
}

export interface ModalProps {
    show?: boolean;
    width?: number | string;
    height?: number | string;
    appearFromCursor?: boolean;
    wrapperClosable?: boolean;
    closeShortcutKey?: string;
    closeOnShortcut?: boolean;
    closable?: boolean;
    bodyStyle?: string | CSSStyleDeclaration;
    title?: string | (() => VNodeChild);
    showHeader?: boolean;
}

export const modalProps = {
    show: {
        type: Boolean as PropType<ModalProps['show']>,
        default: false
    },
    width: {
        type: [Number, String] as PropType<ModalProps['width']>,
        default: 600
    },
    height: {
        type: [Number, String] as PropType<ModalProps['width']>,
        default: 'initial'
    },
    appearFromCursor: {
        type: Boolean as PropType<ModalProps['appearFromCursor']>,
        default: true
    },
    wrapperClosable: {
        type: Boolean as PropType<ModalProps['wrapperClosable']>,
        default: true
    },
    closeShortcutKey: {
        type: String as PropType<ModalProps['closeShortcutKey']>,
        default: 'Escape'
    },
    closeOnShortcut: {
        type: Boolean as PropType<ModalProps['closeOnShortcut']>,
        default: true
    },
    closable: {
        type: Boolean as PropType<ModalProps['closable']>,
        default: true
    },
    bodyStyle: {
        type: [String, Object] as PropType<ModalProps['bodyStyle']>,
        default: undefined
    },
    title: {
        type: [String, Function] as PropType<ModalProps['title']>,
        default: ''
    },
    showHeader: {
        type: Boolean as PropType<ModalProps['showHeader']>,
        default: true
    }
};
