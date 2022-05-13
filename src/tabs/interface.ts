import { InjectionKey, Ref, CSSProperties, VNodeChild, PropType } from 'vue';
import * as CSS from 'csstype';
import type { ElementClassSet, ElementStyleSet } from '../_utils_';

declare module 'csstype' {
    interface Properties {
        '--tab-default-color'?: string;
        '--tab-active-color'?: string;
        '--tab-gap'?: string | number;
    }
}

export const tabsInjectionKey: InjectionKey<Ref<string | number>> = Symbol();
export const tabPaneIKey = Symbol('TabPane');
export const tabIKey = Symbol('Tab');
export type TabsType = 'bar' | 'empty' | 'card' | 'segment';
export type TabPaneName = string | number;
export type OnBeforeTabSwitchImpl = (from: TabPaneName, to: TabPaneName) => Promise<boolean | undefined | void> | boolean | undefined | void;
export type MaybeTabPaneProps = TabPaneProps & TabProps & Record<string, unknown>;

export interface TabsProps {
    value?: TabPaneName;
    defaultTab?: TabPaneName;
    type?: TabsType;
    showLine?: boolean;
    stretch?: boolean;
    center?: boolean;
    tabGap?: number;
    animation?: 'slide' | 'scale' | 'fade';
    activeColor?: string;
    barPosition?: 'bottom' | 'top';
    headerStyle?: ElementStyleSet;
    headerClass?: ElementClassSet;
    contentStyle?: ElementStyleSet;
    contentClass?: ElementClassSet;
    onBeforeTabSwitch?: OnBeforeTabSwitchImpl;
}
export interface TabPaneProps {
    name?: TabPaneName;
    tabLabel?: string | (() => VNodeChild);
    tabStyle?: string | CSSProperties;
    tabClass?: string;
    disabled?: boolean;
    preload?: boolean;
    lazy?: boolean;
}
export interface TabProps {
    name?: string | number;
    disabled?: boolean;
}

export const tabsProps = {
    value: {
        type: [String, Number] as PropType<TabsProps['value']>,
        default: undefined
    },
    defaultTab: {
        type: [String, Number] as PropType<TabsProps['defaultTab']>,
        default: undefined
    },
    type: {
        type: String as PropType<TabsProps['type']>,
        default: 'bar'
    },
    showLine: {
        type: Boolean as PropType<TabsProps['showLine']>,
        default: true
    },
    stretch: {
        type: Boolean as PropType<TabsProps['stretch']>,
        default: false
    },
    center: {
        type: Boolean as PropType<TabsProps['center']>,
        default: false
    },
    tabGap: {
        type: Number as PropType<TabsProps['tabGap']>,
        default: 40
    },
    animation: {
        type: String as PropType<TabsProps['animation']>,
        default: 'slide'
    },
    activeColor: {
        type: String as PropType<TabsProps['activeColor']>,
        default: ''
    },
    barPosition: {
        type: String as PropType<TabsProps['barPosition']>,
        default: 'bottom'
    },
    headerStyle: {
        type: [String, Object] as PropType<TabsProps['headerStyle']>,
        default: undefined
    },
    headerClass: {
        type: String as PropType<TabsProps['headerClass']>,
        default: undefined
    },
    contentStyle: {
        type: [String, Object] as PropType<TabsProps['contentStyle']>,
        default: undefined
    },
    contentClass: {
        type: String as PropType<TabsProps['contentClass']>,
        default: undefined
    },
    onBeforeTabSwitch: {
        type: Function as PropType<TabsProps['onBeforeTabSwitch']>,
        default: undefined
    }
};

export const tabPaneProps = {
    name: {
        type: [String, Number] as PropType<TabPaneProps['name']>,
        default: undefined
    },
    tabLabel: {
        type: [String, Function] as PropType<TabPaneProps['tabLabel']>,
        default: undefined
    },
    tabStyle: {
        type: [String, Object] as PropType<TabPaneProps['tabStyle']>,
        default: undefined
    },
    tabClass: {
        type: String as PropType<TabPaneProps['tabClass']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<TabPaneProps['disabled']>,
        default: false
    },
    preload: {
        type: Boolean as PropType<TabPaneProps['preload']>,
        default: false
    },
    lazy: {
        type: Boolean as PropType<TabPaneProps['lazy']>,
        default: false
    }
};

export const tabProps = {
    name: {
        type: [String, Number] as PropType<TabProps['name']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<TabProps['disabled']>,
        default: false
    }
};
