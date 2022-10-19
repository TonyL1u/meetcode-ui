export type ComponentCategory = 'General' | 'Layout' | 'Navigation' | 'Data Entry' | 'Data Display' | 'Feedback' | 'Other';

export const componentNameMap: Record<string, string> = {
    anchor: '锚点',
    button: '按钮',
    checkbox: '复选框',
    drawer: '抽屉',
    grid: '网格布局',
    icon: '图标',
    input: '输入框',
    layout: '布局',
    loading: '加载',
    menu: '菜单',
    message: '信息',
    modal: '模态框',
    popconfirm: '弹出确认',
    popover: '弹出框',
    popselect: '弹出选择',
    popup: '弹窗',
    progress: '进度条',
    space: '间隔',
    switch: '开关',
    tabs: '标签页',
    'text-link': '文字链接',
    tooltip: '文字提示'
};

export const componentGroupMap: Record<ComponentCategory, string[]> = {
    General: ['button', 'icon', 'space', 'text-link'],
    Layout: ['grid', 'layout'],
    Navigation: ['anchor', 'menu'],
    'Data Entry': ['checkbox', 'input', 'switch'],
    'Data Display': ['tooltip'],
    Feedback: ['drawer', 'message', 'modal', 'popconfirm', 'popover', 'popselect', 'popup', 'progress', 'tabs'],
    Other: []
};

export const categoryNameMap: Record<ComponentCategory, string> = {
    General: '通用',
    Layout: '布局',
    Navigation: '导航',
    'Data Entry': '数据录入',
    'Data Display': '数据展示',
    Feedback: '反馈',
    Other: '其他'
};

export const ENV = import.meta.env;
