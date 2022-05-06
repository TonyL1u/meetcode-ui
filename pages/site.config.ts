import { ref, watch, computed } from 'vue';
import { globalTheme, setGlobalTheme } from 'meetcode-ui';

type SiteTheme = 'light' | 'dark';
export const siteTheme = ref<SiteTheme>(globalTheme.value);
export const isLight = computed(() => siteTheme.value === 'light');
export const isDark = computed(() => siteTheme.value === 'dark');
export function useSiteTheme() {
    return {
        siteTheme,
        isLight,
        isDark,
        switchTheme() {
            if (siteTheme.value === 'dark') {
                siteTheme.value = 'light';
            } else {
                siteTheme.value = 'dark';
            }
        }
    };
}
watch(
    siteTheme,
    theme => {
        setGlobalTheme(theme);
    },
    { immediate: true }
);

type SiteLanguage = 'zh-CN' | 'en-US';
export const siteLanguage = ref<SiteLanguage>('zh-CN');
export const isZhCN = computed(() => siteLanguage.value === 'zh-CN');
export const isEnUS = computed(() => siteLanguage.value === 'en-US');
export function useSiteLanguage() {
    const onLanguageChangeCallbacks: ((lang: SiteLanguage) => void)[] = [];
    watch(siteLanguage, (lang: SiteLanguage) => {
        onLanguageChangeCallbacks.forEach(cb => cb?.(lang));
    });

    return {
        siteLanguage,
        isZhCN,
        isEnUS,
        switchLanguage() {
            if (siteLanguage.value === 'zh-CN') {
                siteLanguage.value = 'en-US';
            } else {
                siteLanguage.value = 'zh-CN';
            }
        },
        onLanguageChange(cb: (lang: SiteLanguage) => void) {
            onLanguageChangeCallbacks.push(cb);
        }
    };
}

export const PATH_NAME_MAP_ZH: Record<string, string> = {
    button: 'Button 按钮',
    checkbox: 'Checkbox 复选框',
    drawer: 'Drawer 抽屉',
    grid: 'Grid 网格布局',
    icon: 'Icon 图标',
    loading: 'Loading 加载',
    message: 'Message 信息',
    modal: 'Modal 模态框',
    popconfirm: 'Popconfirm 弹出确认',
    popover: 'Popover 弹出框',
    popselect: 'Popselect 弹出选择',
    popup: 'Popup 弹窗',
    space: 'Space 间隔',
    tabs: 'Tabs 标签页',
    'text-link': 'Text Link 文字链接',
    tooltip: 'Tooltip 文字提示'
};

export const PATH_NAME_MAP_EN: Record<string, string> = {
    button: 'Button',
    checkbox: 'Checkbox',
    drawer: 'Drawer',
    grid: 'Grid',
    icon: 'Icon',
    loading: 'Loading',
    message: 'Message',
    modal: 'Modal',
    popconfirm: 'Popconfirm',
    popover: 'Popover',
    popselect: 'Popselect',
    popup: 'Popup',
    space: 'Space',
    tabs: 'Tabs',
    'text-link': 'Text Link',
    tooltip: 'Tooltip'
};
