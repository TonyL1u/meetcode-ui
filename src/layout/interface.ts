import type { ElementClassSet } from '../_utils_';
import type { InjectionKey, PropType } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--layout-sider-width'?: string;
    }
}

export const layoutInjectionKey: InjectionKey<unknown> = Symbol('layoutInjectionKey');
export const layoutIKey = Symbol('layout');
export const layoutHeaderIKey = Symbol('layoutHeader');
export const layoutContentIKey = Symbol('layoutContent');
export const layoutFooterIKey = Symbol('layoutFooter');
export const layoutSiderIKey = Symbol('layoutSider');

export interface LayoutProps {
    preset?: 'holy' | 'full' | 'two-col' | 'three-col';
    siderRight?: boolean;
    siderWidth?: string | number;
    fixedSider?: boolean;
    fixedHeader?: boolean;
    fixedFooter?: boolean;
    siderStyle?: Partial<CSSStyleDeclaration> | string;
    headerStyle?: Partial<CSSStyleDeclaration> | string;
    contentStyle?: Partial<CSSStyleDeclaration> | string;
    footerStyle?: Partial<CSSStyleDeclaration> | string;
    siderClass?: ElementClassSet;
    headerClass?: ElementClassSet;
    contentClass?: ElementClassSet;
    footerClass?: ElementClassSet;
}
export interface LayoutSiderProps {
    width?: string | number;
}

export const layoutProps = {
    preset: {
        type: String as PropType<LayoutProps['preset']>,
        default: undefined
    },
    siderRight: {
        type: Boolean as PropType<LayoutProps['siderRight']>,
        default: false
    },
    siderWidth: {
        type: [String, Number] as PropType<LayoutProps['siderWidth']>,
        default: 100
    },
    fixedSider: {
        type: Boolean as PropType<LayoutProps['fixedSider']>,
        default: undefined
    },
    fixedHeader: {
        type: Boolean as PropType<LayoutProps['fixedHeader']>,
        default: undefined
    },
    fixedFooter: {
        type: Boolean as PropType<LayoutProps['fixedFooter']>,
        default: undefined
    },
    siderStyle: {
        type: [Object, String] as PropType<LayoutProps['siderStyle']>,
        default: undefined
    },
    headerStyle: {
        type: [Object, String] as PropType<LayoutProps['headerStyle']>,
        default: undefined
    },
    contentStyle: {
        type: [Object, String] as PropType<LayoutProps['contentStyle']>,
        default: undefined
    },
    footerStyle: {
        type: [Object, String] as PropType<LayoutProps['footerStyle']>,
        default: undefined
    },
    siderClass: {
        type: [Object, String, Array] as PropType<LayoutProps['siderClass']>,
        default: undefined
    },
    headerClass: {
        type: [Object, String, Array] as PropType<LayoutProps['headerClass']>,
        default: undefined
    },
    contentClass: {
        type: [Object, String, Array] as PropType<LayoutProps['contentClass']>,
        default: undefined
    },
    footerClass: {
        type: [Object, String, Array] as PropType<LayoutProps['footerClass']>,
        default: undefined
    }
};

export const layoutSiderProps = {
    width: {
        type: [String, Number] as PropType<LayoutSiderProps['width']>,
        default: 100
    }
};
