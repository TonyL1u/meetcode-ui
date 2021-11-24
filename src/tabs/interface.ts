import { InjectionKey, Ref } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--tab-default-color'?: string;
        '--tab-active-color'?: string;
        '--tab-pad'?: string | number;
    }
}

const tabsInjectionKey: InjectionKey<Ref<string | number>> = Symbol();
const tabPaneIKey = Symbol('TabPane');
export { tabsInjectionKey, tabPaneIKey };
export type PaneName = string | number;
export interface TabPaneProps {
    name?: PaneName;
    tabLabel?: string;
}
export type OnBeforeTabSwitchImpl = (from?: PaneName, to?: PaneName) => Promise<boolean | undefined | void> | boolean | undefined | void;
