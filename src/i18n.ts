import { computed } from 'vue';
import { createGlobalState, useStorage, RemovableRef } from '@vueuse/core';
import zh_CN from './_locale_/zh-CN';
import en_US from './_locale_/en-US';

type LanguageType = 'zh-CN' | 'en-US';
interface UseI18nReturn {
    locale: RemovableRef<LanguageType>;
    setLanguage: (lang: LanguageType) => void;
    switchLanguage: () => void;
    i18n: (chainKey: string, defaultVal?: string) => string;
}
const useGlobalLanguageState = createGlobalState(() => useStorage<LanguageType>('meetcode-ui-language-local-storage', 'en-US'));
export const globalLanguage: RemovableRef<LanguageType> = useGlobalLanguageState();
export function useI18n(): UseI18nReturn;
export function useI18n<T extends string>(module: T): UseI18nReturn;
export function useI18n<T extends string>(module?: T): UseI18nReturn {
    const setLanguage = (lang: LanguageType = 'zh-CN') => {
        globalLanguage.value = lang;
    };
    const i18nData = computed(() => {
        if (globalLanguage.value === 'en-US') return en_US;
        return zh_CN;
    });

    return {
        locale: globalLanguage,
        setLanguage,
        switchLanguage() {
            if (globalLanguage.value === 'en-US') {
                setLanguage('zh-CN');
            } else {
                setLanguage('en-US');
            }
        },
        i18n: (chainKey: string, defaultVal: string = '') => {
            const [name, key] = (module ? `${module}.${chainKey}` : chainKey).split('.');

            return i18nData.value?.[name]?.[key] ?? defaultVal;
        }
    };
}

export function setGlobalLanguage(lang: LanguageType = 'zh-CN') {
    globalLanguage.value = lang;
}
