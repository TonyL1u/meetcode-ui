import { PropType, VNodeChild, Ref, InjectionKey, CSSProperties } from 'vue';
import { ElementClassSet } from '../_utils_';

export type OnBeforeLeaveImpl = (action: ModalCloseAction) => Promise<boolean | undefined | void> | boolean | undefined | void;
export type OnCancelImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type OnConfirmImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type ModalCloseAction = 'wrapper' | 'close' | 'shortcut' | 'cancel' | 'confirm';
export type ModalInjection = Ref<HTMLElement | undefined> | null;
export interface ModalPosition {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
}
export interface ModalExposeInstance {
    hide: () => void;
    el: HTMLElement;
}
export interface ModalProps {
    show?: boolean;
    width?: number | string;
    height?: number | string;
    appearFromCursor?: boolean;
    wrapperClosable?: boolean;
    shortcutKey?: string;
    closeOnShortcut?: boolean;
    closable?: boolean;
    headerStyle?: string | CSSProperties;
    bodyStyle?: string | CSSProperties;
    footerStyle?: string | CSSProperties;
    maskStyle?: string | CSSProperties;
    headerClass?: ElementClassSet;
    bodyClass?: ElementClassSet;
    footerClass?: ElementClassSet;
    title?: string | (() => VNodeChild);
    showHeader?: boolean;
    showFooter?: boolean;
    cancelText?: string | null;
    confirmText?: string | null;
    pure?: boolean;
    position?: ModalPosition;
    animation?: 'scale' | 'slide';
    onBeforeLeave?: OnBeforeLeaveImpl;
    appearX?: number;
    appearY?: number;
}
export interface ModalObjectEmits {
    'onUpdate:show'?: (val: boolean) => void;
    onWrapperClick?: (e: MouseEvent) => void;
    onShortcutStroke?: (keys: string[]) => void;
    onAfterEnter?: () => void;
    onAfterLeave?: () => void;
    onBeforeEnter?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
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
        type: [Number, String] as PropType<ModalProps['height']>,
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
    shortcutKey: {
        type: String as PropType<ModalProps['shortcutKey']>,
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
    headerClass: {
        type: [String, Object, Array] as PropType<ModalProps['headerClass']>,
        default: undefined
    },
    bodyClass: {
        type: [String, Object, Array] as PropType<ModalProps['bodyClass']>,
        default: undefined
    },
    footerClass: {
        type: [String, Object, Array] as PropType<ModalProps['footerClass']>,
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
        default: undefined
    },
    confirmText: {
        type: [String, Object] as PropType<ModalProps['confirmText']>,
        default: undefined
    },
    pure: {
        type: Boolean as PropType<ModalProps['pure']>,
        default: false
    },
    position: {
        type: Object as PropType<ModalProps['position']>,
        default: undefined
    },
    animation: {
        type: String as PropType<ModalProps['animation']>,
        default: 'scale'
    },
    onBeforeLeave: {
        type: Function as PropType<ModalProps['onBeforeLeave']>,
        default: undefined
    },
    appearX: {
        type: Number as PropType<ModalProps['appearX']>,
        default: undefined
    },
    appearY: {
        type: Number as PropType<ModalProps['appearY']>,
        default: undefined
    }
};
export const modalInjectionKey: InjectionKey<ModalInjection> = Symbol('modalInjectionKey');
