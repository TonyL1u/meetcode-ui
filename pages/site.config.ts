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

export const PATH_NAME_MAP: Record<string, string> = {
    Button: 'Button 按钮',
    Checkbox: 'Checkbox 复选框',
    Drawer: 'Drawer 抽屉',
    Grid: 'Grid 网格布局',
    Icon: 'Icon 图标',
    Loading: 'Loading 加载',
    Message: 'Message 信息',
    Modal: 'Modal 模态框',
    Popconfirm: 'Popconfirm 弹出确认',
    Popover: 'Popover 弹出框',
    Popselect: 'Popselect 弹出选择',
    Popup: 'Popup 弹窗',
    Space: 'Space 间隔',
    Tabs: 'Tabs 标签页',
    'Text Link': 'Text Link 文字链接',
    Tooltip: 'Tooltip 文字提示'
};
