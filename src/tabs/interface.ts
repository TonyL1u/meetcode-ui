import { InjectionKey, Ref, CSSProperties } from 'vue';
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
export type PaneName = string | number;
export interface TabPaneProps {
    name?: string | number;
    tabLabel?: string;
    tabStyle?: CSSProperties;
    disabled?: boolean;
    preload?: boolean;
    lazy?: boolean;
}
export interface MaybeTabPaneProps extends TabPaneProps {
    [key: string]: any;
}
export type OnBeforeTabSwitchImpl = (from?: PaneName, to?: PaneName) => Promise<boolean | undefined | void> | boolean | undefined | void;
