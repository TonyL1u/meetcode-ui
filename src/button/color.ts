import { computed } from 'vue';
import { isDark } from '../theme';
import { UIStatus } from '../_utils_';
import { ButtonColorSet, ButtonType } from './interface';
import { ThemeColor } from '../_color_';

const BUTTON_COLOR_MAP: Record<ButtonType, ButtonColorSet> = {
    custom: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    default: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    primary: {
        color: ThemeColor.INFO,
        borderColor: ThemeColor.INFO,
        backgroundColor: ThemeColor.INFO
    },
    success: {
        color: ThemeColor.SUCCESS,
        borderColor: ThemeColor.SUCCESS,
        backgroundColor: ThemeColor.SUCCESS
    },
    warning: {
        color: ThemeColor.WARNING,
        borderColor: ThemeColor.WARNING,
        backgroundColor: ThemeColor.WARNING
    },
    danger: {
        color: ThemeColor.DANGER,
        borderColor: ThemeColor.DANGER,
        backgroundColor: ThemeColor.DANGER
    }
};

const BUTTON_COLOR_MAP_DARK: Record<ButtonType, ButtonColorSet> = {
    custom: {
        color: '#fff',
        borderColor: '#e0e0e6',
        backgroundColor: '#000'
    },
    default: {
        color: '#fff',
        borderColor: '#e0e0e6',
        backgroundColor: '#000'
    },
    primary: {
        color: '#70c0e8',
        borderColor: '#70c0e8',
        backgroundColor: '#70c0e8'
    },
    success: {
        color: '#63e2b7',
        borderColor: '#63e2b7',
        backgroundColor: '#63e2b7'
    },
    warning: {
        color: '#f2c97d',
        borderColor: '#f2c97d',
        backgroundColor: '#f2c97d'
    },
    danger: {
        color: '#e88080',
        borderColor: '#e88080',
        backgroundColor: '#e88080'
    }
};

const DEFAULT_BUTTON_COLOR_MAP: Record<UIStatus, ButtonColorSet> = {
    default: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    hover: {
        color: '#059669',
        borderColor: '#10b981',
        backgroundColor: '#fff'
    },
    active: {
        color: '#15803d',
        borderColor: '#15803d',
        backgroundColor: '#fff'
    },
    disabled: {
        color: '#aaa',
        borderColor: '#eee',
        backgroundColor: '#fff'
    }
};

const DEFAULT_BUTTON_COLOR_MAP_DARK: Record<UIStatus, ButtonColorSet> = {
    default: {
        color: '#fff',
        borderColor: '#50535a',
        // backgroundColor: '#313540',
        backgroundColor: '#000'
    },
    hover: {
        color: '#7fe7c4',
        borderColor: '#7fe7c4',
        backgroundColor: '#000'
    },
    active: {
        color: '#5acea7',
        borderColor: '#5acea7',
        backgroundColor: '#000'
    },
    disabled: {
        color: '#7a7d85',
        borderColor: '#7a7d85',
        backgroundColor: '#000'
    }
};

export const buttonColorMap = computed(() => {
    return isDark.value ? BUTTON_COLOR_MAP_DARK : BUTTON_COLOR_MAP;
});

export const defaultButtonColorMap = computed(() => {
    return isDark.value ? DEFAULT_BUTTON_COLOR_MAP_DARK : DEFAULT_BUTTON_COLOR_MAP;
});
