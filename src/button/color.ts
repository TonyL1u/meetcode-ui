import { computed } from 'vue';
import { isDark } from '../theme';
import { UIStatus } from '../_utils_';
import { ButtonColorSet, ButtonType } from './interface';

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
        color: '#3b82f6',
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6'
    },
    success: {
        color: '#16a34a',
        borderColor: '#16a34a',
        backgroundColor: '#16a34a'
    },
    warning: {
        color: '#fb923c',
        borderColor: '#fb923c',
        backgroundColor: '#fb923c'
    },
    danger: {
        color: '#dc2626',
        borderColor: '#dc2626',
        backgroundColor: '#dc2626'
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
