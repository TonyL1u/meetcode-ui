import * as CSS from 'csstype';
import type { Key } from '../_utils_';
import type { PropType, InjectionKey, Ref, VNodeChild, ComputedRef } from 'vue';
import type { UseEventBusReturn } from '@vueuse/core';

declare module 'csstype' {
    interface Properties {
        '--menu-collapsed-icon-size'?: string;
        '--menu-collapsed-padding'?: string;
        '--menu-submenu-padding-left'?: string;
        '--menu-item-padding-left'?: string;
    }
}
interface MenuInjection {
    activeKey: Ref<Key>;
    updateKey: (key: Key) => void;
    expandedKeys: Ref<Key[]>;
    updateExpandKeys: (key: Key) => void;
    key: string;
    padding: ComputedRef<number>;
    isUnique: Ref<boolean>;
    isAutoEmit: Ref<boolean>;
    collapsedIconSize: Ref<number>;
    BusUniqueControl: UseEventBusReturn<string, any>;
    BusExpandControl: UseEventBusReturn<boolean, any>;
}
interface SubMenuInjection {
    key: string;
    padding: ComputedRef<number>;
    isUnique: Ref<boolean>;
    isAutoEmit: Ref<boolean>;
}
interface MenuGroupInjection {
    padding: ComputedRef<number>;
}
export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol();
export const subMenuInjectionKey: InjectionKey<SubMenuInjection> = Symbol();
export const menuGroupInjectionKey: InjectionKey<MenuGroupInjection> = Symbol();
export const menuIKey = Symbol('menu');
export const menuItemIKey = Symbol('menuItem');
export const menuItemGroupIKey = Symbol('menuItemGroup');
export const subMenuIKey = Symbol('subMenu');
export interface MenuExposeInstance {
    expandAll: () => void;
    collapseAll: () => void;
}
export interface MenuProps {
    value?: Key;
    expandKeys?: Key[];
    indent?: number;
    unique?: boolean;
    submenuAutoEmit?: boolean;
    collapsed?: boolean;
    collapsedIconSize?: number;
}
export interface MenuItemProps {
    indent?: number;
}
export interface MenuItemGroupProps {
    title?: string | (() => VNodeChild);
    indent?: number;
}
export interface SubMenuProps {
    title?: string | (() => VNodeChild);
    unique?: boolean;
    submenuAutoEmit?: boolean;
    indent?: number;
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
    indent: {
        type: Number as PropType<MenuProps['indent']>,
        default: 32
    },
    unique: {
        type: Boolean as PropType<MenuProps['unique']>,
        default: false
    },
    submenuAutoEmit: {
        type: Boolean as PropType<MenuProps['submenuAutoEmit']>,
        default: true
    },
    collapsed: {
        type: Boolean as PropType<MenuProps['collapsed']>,
        default: false
    },
    collapsedIconSize: {
        type: Number as PropType<MenuProps['collapsedIconSize']>,
        default: 20
    }
};
export const menuItemProps = {
    indent: {
        type: Number as PropType<MenuItemProps['indent']>,
        default: undefined
    }
};
export const menuItemGroupProps = {
    title: {
        type: [String, Function] as PropType<MenuItemGroupProps['title']>,
        default: undefined
    },
    indent: {
        type: Number as PropType<MenuItemGroupProps['indent']>,
        default: undefined
    }
};
export const subMenuProps = {
    title: {
        type: [String, Function] as PropType<SubMenuProps['title']>,
        default: undefined
    },
    unique: {
        type: Boolean as PropType<SubMenuProps['unique']>,
        default: false
    },
    submenuAutoEmit: {
        type: Boolean as PropType<SubMenuProps['submenuAutoEmit']>,
        default: true
    },
    indent: {
        type: Number as PropType<SubMenuProps['indent']>,
        default: undefined
    }
};
