import { computed } from 'vue';
import { useI18nController } from '../i18n';
import zh_CN from '../_locale_/zh-CN';
import en_US from '../_locale_/en-US';
import type { RemovableRef } from '@vueuse/core';

export function useI18n<T extends string>(module?: T) {
    const { current } = useI18nController();
    const i18nData = computed(() => {
        if (current.value === 'en-US') return en_US;
        return zh_CN;
    });

    return {
        locale: current,
        i18n: (chainKey: string, defaultVal: string = '') => {
            const [name, key] = (module ? `${module}.${chainKey}` : chainKey).split('.');

            return i18nData.value?.[name]?.[key] ?? defaultVal;
        }
    };
}
