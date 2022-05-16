import type { Key } from '../_utils_';
import type { PropType, InjectionKey, Ref, VNodeChild } from 'vue';

export interface MenuInjection {
    activeKey: Ref<Key>;
    updateKey: (key: Key) => void;
}
export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol();
export const menuIKey = Symbol('menu');
export const menuItemGroupIKey = Symbol('menuItemGroup');
export const subMenuIKey = Symbol('subMenu');

export interface MenuProps {
    value: Key;
}
export interface MenuItemProps {
    key: Key;
}
export interface MenuItemGroupProps {
    title: string | (() => VNodeChild);
}
export const menuProps = {
    value: {
        type: [String, Number, Symbol] as PropType<MenuProps['value']>,
        default: undefined
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
