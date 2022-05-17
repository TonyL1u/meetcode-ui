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
    BusUniqueControl: UseEventBusReturn<string, any>;
    isUnique: Ref<boolean>;
}
interface SubMenuInjection {
    padding: number;
    key: string;
    isUnique: Ref<boolean>;
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
}
export interface MenuItemProps {
    key?: Key;
}
export interface MenuItemGroupProps {
    title?: string | (() => VNodeChild);
}
export interface SubMenuProps {
    title?: string | (() => VNodeChild);
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
    indent: {
        type: Number as PropType<MenuProps['indent']>,
        default: 32
    },
    unique: {
        type: Boolean as PropType<MenuProps['unique']>,
        default: false
    }
};
export const menuItemProps = {
    key: {
        type: [String, Number, Symbol] as PropType<MenuItemProps['key']>,
        default: undefined
    }
};
export const menuItemGroupProps = {
    title: {
        type: [String, Function] as PropType<MenuItemGroupProps['title']>,
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
    }
};
