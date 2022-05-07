import { createGlobalState, useStorage, RemovableRef, createEventHook } from '@vueuse/core';
import type { EventHookOn } from '@vueuse/core';

export type LanguageType = 'zh-CN' | 'en-US';
const useGlobalLanguageState = createGlobalState(() => useStorage<LanguageType>('meetcode-ui-language-local-storage', 'en-US'));
export const globalLanguage: RemovableRef<LanguageType> = useGlobalLanguageState();

/**
 * User's integrate i18n controller
 */
export function useI18nController(initialLang?: LanguageType) {
    const languageChangeEventHook = createEventHook<LanguageType>();
    const setLanguage = (lang: LanguageType = 'zh-CN') => {
        globalLanguage.value = lang;
    };

    if (initialLang) setLanguage(initialLang);

    return {
        current: globalLanguage,
        setLanguage,
        switchLanguage() {
            if (globalLanguage.value === 'en-US') {
                setLanguage('zh-CN');
                languageChangeEventHook.trigger('zh-CN');
            } else {
                setLanguage('en-US');
                languageChangeEventHook.trigger('en-US');
            }
        },
        onLanguageChange: languageChangeEventHook.on
    };
}
