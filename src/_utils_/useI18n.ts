import { computed } from 'vue';
import { globalLanguage } from '../i18n';
import zh_CN from '../_locale_/zh-CN';
import en_US from '../_locale_/en-US';
import type { LanguageType } from '../i18n';
import type { RemovableRef } from '@vueuse/core';

export function useI18n<T extends string>(module?: T) {
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
