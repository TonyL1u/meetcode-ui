import { InjectionKey, Ref, CSSProperties, VNodeChild } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--tab-default-color'?: string;
        '--tab-active-color'?: string;
        '--tab-gap'?: string | number;
    }
}

const tabsInjectionKey: InjectionKey<Ref<string | number>> = Symbol();
const tabPaneIKey = Symbol('TabPane');
const tabIKey = Symbol('Tab');
export { tabsInjectionKey, tabPaneIKey, tabIKey };
export type TabPaneName = string | number;
export interface TabPaneProps {
    name?: TabPaneName;
    tabLabel?: string | (() => VNodeChild);
    tabStyle?: string | CSSProperties;
    tabClass?: string;
    disabled?: boolean;
    preload?: boolean;
    lazy?: boolean;
}
export interface MaybeTabPaneProps extends TabPaneProps {
    [key: string]: any;
}
export type OnBeforeTabSwitchImpl = (from: TabPaneName, to: TabPaneName) => Promise<boolean | undefined | void> | boolean | undefined | void;
