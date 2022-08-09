import type { Key, ElementClassSet, ElementStyleSet } from '../_utils_';
import type { PropType, InjectionKey, Ref, VNodeChild, ComputedRef } from 'vue';

interface MenuInjection {
    activeKey: Ref<Key>;
    updateKey: (key: Key) => void;
    expandedKeys: Ref<Key[]>;
    updateExpandKeys: (key: Key | Key[]) => void;
    keyTree: KeyTree[];
    options: Ref<MenuOption[]>;
    padding: ComputedRef<number>;
    isDisabled: Ref<boolean>;
    isUnique: Ref<boolean>;
    isCollapsed: Ref<boolean>;
    isHorizontal: Ref<boolean>;
}
interface SubMenuInjection {
    padding: ComputedRef<number>;
    isDisabled: Ref<boolean>;
    isUnique: Ref<boolean>;
    hidePopover: () => void;
}
interface MenuGroupInjection {
    padding: ComputedRef<number>;
    isDisabled: Ref<boolean>;
    hidePopover: () => void;
}
export interface KeyTree {
    key: Key;
    children?: KeyTree[];
}
export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol();
export const subMenuInjectionKey: InjectionKey<SubMenuInjection> = Symbol();
export const menuGroupInjectionKey: InjectionKey<MenuGroupInjection> = Symbol();
export const menuIKey = Symbol('menu');
export const menuItemIKey = Symbol('menuItem');
export const menuItemGroupIKey = Symbol('menuItemGroup');
export const subMenuIKey = Symbol('subMenu');
export interface MenuExposeInstance {
    el: HTMLElement;
    expand: (key: Key | Key[], autoSelect?: boolean) => void;
    collapseAll: () => void;
}
export interface MenuOption {
    key?: Key;
    label?: string | (() => VNodeChild);
    icon?: () => VNodeChild;
    indent?: number;
    disabled?: boolean;
    unique?: boolean;
    group?: boolean;
    children?: MenuOption[];
    extra?: Record<string, any>;
    style?: ElementStyleSet;
    class?: ElementClassSet;
}
export interface MenuProps {
    value?: Key;
    expandKeys?: Key[];
    disabled?: boolean;
    indent?: number;
    unique?: boolean;
    collapsed?: boolean;
    collapsedWidth?: number;
    collapsedIconSize?: number;
    horizontal?: boolean;
    options?: MenuOption[];
}
export interface MenuItemProps {
    disabled?: boolean;
    indent?: number | 'auto';
}
export interface MenuItemGroupProps {
    title?: string | (() => VNodeChild);
    disabled?: boolean;
    indent?: number | 'auto';
}
export interface SubMenuProps {
    title?: string | (() => VNodeChild);
    disabled?: boolean;
    indent?: number | 'auto';
    unique?: boolean;
}
export const menuProps = {
    value: {
        type: [String, Number, Symbol] as PropType<MenuProps['value']>,
        default: undefined
    },
    expandKeys: {
        type: Array as PropType<MenuProps['expandKeys']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<MenuProps['disabled']>,
        default: false
    },
    indent: {
        type: Number as PropType<MenuProps['indent']>,
        default: 28
    },
    unique: {
        type: Boolean as PropType<MenuProps['unique']>,
        default: false
    },
    collapsed: {
        type: Boolean as PropType<MenuProps['collapsed']>,
        default: false
    },
    collapsedWidth: {
        type: Number as PropType<MenuProps['collapsedWidth']>,
        default: 64
    },
    collapsedIconSize: {
        type: Number as PropType<MenuProps['collapsedIconSize']>,
        default: 20
    },
    horizontal: {
        type: Boolean as PropType<MenuProps['horizontal']>,
        default: false
    },
    options: {
        type: Array as PropType<MenuProps['options']>,
        default: undefined
    }
};
export const menuItemProps = {
    disabled: {
        type: Boolean as PropType<MenuItemProps['disabled']>,
        default: false
    },
    indent: {
        type: [Number, String] as PropType<MenuItemProps['indent']>,
        default: undefined
    }
};
export const menuItemGroupProps = {
    title: {
        type: [String, Function] as PropType<MenuItemGroupProps['title']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<MenuItemGroupProps['disabled']>,
        default: false
    },
    indent: {
        type: [Number, String] as PropType<MenuItemGroupProps['indent']>,
        default: undefined
    }
};
export const subMenuProps = {
    title: {
        type: [String, Function] as PropType<SubMenuProps['title']>,
        default: undefined
    },
    disabled: {
        type: Boolean as PropType<SubMenuProps['disabled']>,
        default: false
    },
    indent: {
        type: [Number, String] as PropType<SubMenuProps['indent']>,
        default: undefined
    },
    unique: {
        type: Boolean as PropType<SubMenuProps['unique']>,
        default: false
    }
};
