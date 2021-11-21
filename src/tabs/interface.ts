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
export interface TabPaneProps {
    name?: string | number;
    tabLabel?: string;
}
