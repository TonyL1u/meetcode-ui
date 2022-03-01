import { PropType, VNodeChild } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--modal-width'?: string;
        '--modal-height'?: string;
    }
}

export type OnBeforeLeaveImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type OnBeforeEnterImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export interface ModalPosition {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
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
    headerStyle?: string | CSSStyleDeclaration;
    bodyStyle?: string | CSSStyleDeclaration;
    footerStyle?: string | CSSStyleDeclaration;
    maskStyle?: string | CSSStyleDeclaration;
    title?: string | (() => VNodeChild);
    showHeader?: boolean;
    showFooter?: boolean;
    cancelText?: string | null;
    confirmText?: string | null;
    pure?: boolean;
    position?: ModalPosition;
    onBeforeEnter?: OnBeforeEnterImpl;
    onBeforeLeave?: OnBeforeLeaveImpl;
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
    headerStyle: {
        type: [String, Object] as PropType<ModalProps['headerStyle']>,
        default: undefined
    },
    bodyStyle: {
        type: [String, Object] as PropType<ModalProps['bodyStyle']>,
        default: undefined
    },
    footerStyle: {
        type: [String, Object] as PropType<ModalProps['footerStyle']>,
        default: undefined
    },
    title: {
        type: [String, Function] as PropType<ModalProps['title']>,
        default: ''
    },
    showHeader: {
        type: Boolean as PropType<ModalProps['showHeader']>,
        default: true
    },
    showFooter: {
        type: Boolean as PropType<ModalProps['showFooter']>,
        default: true
    },
    cancelText: {
        type: [String, Object] as PropType<ModalProps['cancelText']>,
        default: '取消'
    },
    confirmText: {
        type: [String, Object] as PropType<ModalProps['confirmText']>,
        default: '确定'
    },
    pure: {
        type: Boolean as PropType<ModalProps['pure']>,
        default: false
    },
    position: {
        type: Object as PropType<ModalProps['position']>,
        default: undefined
    },
    onBeforeEnter: {
        type: Function as PropType<ModalProps['onBeforeEnter']>,
        default: undefined
    },
    onBeforeLeave: {
        type: Function as PropType<ModalProps['onBeforeLeave']>,
        default: undefined
    }
};
