import { PropType, VNodeChild, Ref, InjectionKey } from 'vue';
import { ElementClassSet } from '../_utils_';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--drawer-width'?: string;
        '--drawer-height'?: string;
    }
}
export type DrawerCloseAction = 'wrapper' | 'close' | 'shortcut';
export type DrawerAppearDirection = 'top' | 'right' | 'bottom' | 'left';
export type OnBeforeLeaveImpl = (action: DrawerCloseAction) => Promise<boolean | undefined | void> | boolean | undefined | void;
export type DrawerInjection = Ref<HTMLElement | null> | null;
export interface DrawerExposeInstance {
    hide: () => void;
    el: HTMLElement;
}
export interface DrawerProps {
    show?: boolean;
    size?: number | string;
    appearDirection?: DrawerAppearDirection;
    wrapperClosable?: boolean;
    shortcutKey?: string;
    closeOnShortcut?: boolean;
    closable?: boolean;
    headerStyle?: string | Partial<CSSStyleDeclaration>;
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
    maskStyle?: string | Partial<CSSStyleDeclaration>;
    headerClass?: ElementClassSet;
    bodyClass?: ElementClassSet;
    title?: string | (() => VNodeChild);
    showHeader?: boolean;
    pure?: boolean;
    onBeforeLeave?: OnBeforeLeaveImpl;
}
export interface DrawerObjectEmits {
    'onUpdate:show'?: (val: boolean) => void;
    onWrapperClick?: (e: MouseEvent) => void;
    onShortcutStroke?: (keys: string[]) => void;
    onAfterEnter?: () => void;
    onAfterLeave?: () => void;
    onBeforeEnter?: () => void;
}
export const drawerProps = {
    show: {
        type: Boolean as PropType<DrawerProps['show']>,
        default: false
    },
    size: {
        type: [Number, String] as PropType<DrawerProps['size']>,
        default: 600
    },
    appearDirection: {
        type: String as PropType<DrawerProps['appearDirection']>,
        default: 'right'
    },
    wrapperClosable: {
        type: Boolean as PropType<DrawerProps['wrapperClosable']>,
        default: true
    },
    shortcutKey: {
        type: String as PropType<DrawerProps['shortcutKey']>,
        default: 'Escape'
    },
    closeOnShortcut: {
        type: Boolean as PropType<DrawerProps['closeOnShortcut']>,
        default: true
    },
    closable: {
        type: Boolean as PropType<DrawerProps['closable']>,
        default: true
    },
    headerStyle: {
        type: [String, Object] as PropType<DrawerProps['headerStyle']>,
        default: undefined
    },
    bodyStyle: {
        type: [String, Object] as PropType<DrawerProps['bodyStyle']>,
        default: undefined
    },
    headerClass: {
        type: [String, Object, Array] as PropType<DrawerProps['headerClass']>,
        default: undefined
    },
    bodyClass: {
        type: [String, Object, Array] as PropType<DrawerProps['bodyClass']>,
        default: undefined
    },
    title: {
        type: [String, Function] as PropType<DrawerProps['title']>,
        default: ''
    },
    showHeader: {
        type: Boolean as PropType<DrawerProps['showHeader']>,
        default: true
    },
    pure: {
        type: Boolean as PropType<DrawerProps['pure']>,
        default: false
    },
    onBeforeLeave: {
        type: Function as PropType<DrawerProps['onBeforeLeave']>,
        default: undefined
    }
};
export const drawerInjectionKey: InjectionKey<DrawerInjection> = Symbol('drawerInjectionKey');
