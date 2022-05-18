import type { Key } from '../_utils_';
import type { PropType, InjectionKey, Ref, VNodeChild } from 'vue';
import type { UseEventBusReturn } from '@vueuse/core';

interface MenuInjection {
    activeKey: Ref<Key>;
    updateKey: (key: Key) => void;
    expandedKeys: Ref<Key[]>;
    updateExpandKeys: (key: Key) => void;
    padding: number;
    key: string;
    isUnique: Ref<boolean>;
    isAutoEmit: Ref<boolean>;
    BusUniqueControl: UseEventBusReturn<string, any>;
}
interface SubMenuInjection {
    padding: number;
    key: string;
    isUnique: Ref<boolean>;
    isAutoEmit: Ref<boolean>;
}
interface MenuGroupInjection {
    padding: number;
}
export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol();
export const subMenuInjectionKey: InjectionKey<SubMenuInjection> = Symbol();
export const menuGroupInjectionKey: InjectionKey<MenuGroupInjection> = Symbol();
export const menuIKey = Symbol('menu');
export const menuItemIKey = Symbol('menuItem');
export const menuItemGroupIKey = Symbol('menuItemGroup');
export const subMenuIKey = Symbol('subMenu');

export interface MenuProps {
    value?: Key;
    expandKeys?: Key[];
    indent?: number;
    unique?: boolean;
    submenuAutoEmit?: boolean;
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
