export const componentNameMap: Record<string, string> = {
    button: '按钮',
    checkbox: '复选框',
    drawer: '抽屉',
    grid: '网格布局',
    icon: '图标',
    layout: '布局',
    loading: '加载',
    menu: '菜单',
    message: '信息',
    modal: '模态框',
    popconfirm: '弹出确认',
    popover: '弹出框',
    popselect: '弹出选择',
    popup: '弹窗',
    space: '间隔',
    tabs: '标签页',
    'text link': '文字链接',
    tooltip: '文字提示'
};

type ComponentCategory = '通用' | '反馈' | '数据录入' | '数据展示' | '布局';
export const componentCategoryMap: Record<string, ComponentCategory> = {
    button: '通用',
    checkbox: '数据录入',
    drawer: '反馈',
    grid: '布局',
    icon: '通用',
    layout: '布局',
    loading: '反馈',
    menu: '反馈',
    message: '反馈',
    modal: '反馈',
    popconfirm: '反馈',
    popover: '反馈',
    popselect: '反馈',
    popup: '反馈',
    space: '通用',
    tabs: '反馈',
    'text link': '数据展示',
    tooltip: '数据展示'
};
