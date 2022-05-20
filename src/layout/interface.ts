import type { ElementClassSet, ElementStyleSet } from '../_utils_';
import type { InjectionKey, PropType, CSSProperties } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--layout-sider-width'?: string;
        '--layout-header-height'?: string;
        '--layout-sider-collapse-button-trigger-top'?: string;
        '--layout-sider-collapse-button-trigger-bottom'?: string;
        '--layout-sider-scroll-area-min-width'?: string;
    }
}

export const layoutInjectionKey: InjectionKey<unknown> = Symbol('layoutInjectionKey');
export const layoutIKey = Symbol('layout');
export const layoutHeaderIKey = Symbol('layoutHeader');
export const layoutContentIKey = Symbol('layoutContent');
export const layoutFooterIKey = Symbol('layoutFooter');
export const layoutSiderIKey = Symbol('layoutSider');
export const basicColumnLayoutComponentIKey = Symbol('basicColumnLayoutComponent');
export const basicRowLayoutComponentIKey = Symbol('basicRowLayoutComponent');

export interface LayoutProps {
    preset?: 'holy' | 'full' | 'two-column' | 'three-column';
    siderRight?: boolean;
    siderWidth?: string | number;
    leftSiderWidth?: string | number;
    rightSiderWidth?: string | number;
    fixedSider?: boolean;
    fixedLeftSider?: boolean;
    fixedRightSider?: boolean;
    fixedHeader?: boolean;
    fixedFooter?: boolean;
    siderStyle?: ElementStyleSet;
    leftSiderStyle?: ElementStyleSet;
    rightSiderStyle?: ElementStyleSet;
    headerStyle?: ElementStyleSet;
    contentStyle?: ElementStyleSet;
    footerStyle?: ElementStyleSet;
    siderClass?: ElementClassSet;
    leftSiderClass?: ElementClassSet;
    rightSiderClass?: ElementClassSet;
    headerClass?: ElementClassSet;
    contentClass?: ElementClassSet;
    footerClass?: ElementClassSet;
    showSider?: boolean;
    showLeftSider?: boolean;
    showRightSider?: boolean;
    showHeader?: boolean;
    showContent?: boolean;
    showFooter?: boolean;
}
export interface LayoutSiderProps {
    width?: string | number;
    bordered?: boolean;
    collapsed?: boolean;
    collapsable?: boolean;
    collapsedWidth?: string | number;
    triggerPosition?: { top?: CSS.Properties['top']; bottom?: CSS.Properties['bottom'] };
    triggerType?: 'button' | 'bar';
    transitionMode?: 'width' | 'transform';
    onBeforeToggle: (isCollapsed: boolean) => Promise<boolean | undefined | void> | boolean | undefined | void;
}

export interface LayoutHeaderProps {
    bordered?: boolean;
}

export interface LayoutFooterProps {
    bordered?: boolean;
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
    leftSiderWidth: {
        type: [String, Number] as PropType<LayoutProps['leftSiderWidth']>,
        default: 100
    },
    rightSiderWidth: {
        type: [String, Number] as PropType<LayoutProps['rightSiderWidth']>,
        default: 100
    },
    fixedSider: {
        type: Boolean as PropType<LayoutProps['fixedSider']>,
        default: undefined
    },
    fixedLeftSider: {
        type: Boolean as PropType<LayoutProps['fixedLeftSider']>,
        default: undefined
    },
    fixedRightSider: {
        type: Boolean as PropType<LayoutProps['fixedRightSider']>,
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
    leftSiderStyle: {
        type: [Object, String] as PropType<LayoutProps['leftSiderStyle']>,
        default: undefined
    },
    rightSiderStyle: {
        type: [Object, String] as PropType<LayoutProps['rightSiderStyle']>,
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
    leftSiderClass: {
        type: [Object, String, Array] as PropType<LayoutProps['leftSiderClass']>,
        default: undefined
    },
    rightSiderClass: {
        type: [Object, String, Array] as PropType<LayoutProps['rightSiderClass']>,
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
    },
    showSider: {
        type: Boolean as PropType<LayoutProps['showSider']>,
        default: true
    },
    showLeftSider: {
        type: Boolean as PropType<LayoutProps['showLeftSider']>,
        default: true
    },
    showRightSider: {
        type: Boolean as PropType<LayoutProps['showRightSider']>,
        default: true
    },
    showHeader: {
        type: Boolean as PropType<LayoutProps['showHeader']>,
        default: true
    },
    showContent: {
        type: Boolean as PropType<LayoutProps['showContent']>,
        default: true
    },
    showFooter: {
        type: Boolean as PropType<LayoutProps['showFooter']>,
        default: true
    }
};

export const layoutSiderProps = {
    width: {
        type: [String, Number] as PropType<LayoutSiderProps['width']>,
        default: 100
    },
    bordered: {
        type: Boolean as PropType<LayoutSiderProps['bordered']>,
        default: false
    },
    collapsed: {
        type: Boolean as PropType<LayoutSiderProps['collapsed']>,
        default: false
    },
    collapsable: {
        type: Boolean as PropType<LayoutSiderProps['collapsable']>,
        default: false
    },
    collapsedWidth: {
        type: [String, Number] as PropType<LayoutSiderProps['collapsedWidth']>,
        default: 64
    },
    triggerPosition: {
        type: Object as PropType<LayoutSiderProps['triggerPosition']>,
        default: undefined
    },
    triggerType: {
        type: String as PropType<LayoutSiderProps['triggerType']>,
        default: 'button'
    },
    transitionMode: {
        type: String as PropType<LayoutSiderProps['transitionMode']>,
        default: 'width'
    },
    onBeforeToggle: {
        type: Function as PropType<LayoutSiderProps['onBeforeToggle']>,
        default: undefined
    }
};

export const layoutHeaderProps = {
    bordered: {
        type: Boolean as PropType<LayoutHeaderProps['bordered']>,
        default: false
    }
};

export const layoutFooterProps = {
    bordered: {
        type: Boolean as PropType<LayoutFooterProps['bordered']>,
        default: false
    }
};
