import { createVNode } from 'vue';
import { flatten, createComponentVNode, PatchFlags } from '../../_utils_';
import { subMenuIKey, menuItemIKey, menuItemGroupIKey } from '../interface';
import McMenuItem from './MenuItem';
import McMenuItemGroup from './MenuItemGroup';
import McSubMenu from './SubMenu';
import type { VNode, CustomVNodeTypes } from 'vue';
import type { MenuOption, KeyTree } from '../interface';
import type { Key } from '../../_utils_';

export function createKeyTree(children: VNode[], result: KeyTree[] = []) {
    children.forEach(vnode => {
        const { iKey } = vnode.type as CustomVNodeTypes;
        const subChildren = (vnode.children as Record<string, () => VNode[]>).default?.();
        if (iKey === menuItemIKey) {
            result.push({ key: vnode.key ?? '' });
        } else if (iKey === subMenuIKey) {
            result.push({
                key: vnode.key ?? '',
                children: createKeyTree(subChildren)
            });
        } else if (iKey === menuItemGroupIKey) {
            const items = flatten(subChildren, [subMenuIKey, menuItemIKey]);
            createKeyTree(items, result);
        }
    });

    return result;
}

export function createKeyTreeByOptions(options: MenuOption[], result: KeyTree[] = []) {
    options.forEach(option => {
        const { key = '', children, group } = option;
        if (group) {
            const items: MenuOption[] = (children ?? []).map(({ key = '', children }) => ({ key, children }));
            createKeyTreeByOptions(items, result);
        } else if (children) {
            result.push({
                key,
                children: createKeyTreeByOptions(children ?? [])
            });
        } else {
            result.push({ key });
        }
    });

    return result;
}

export function createMenu(option: MenuOption) {
    const { key, label, icon, indent, disabled, unique, group, children, style, class: itemClass } = option;
    if (group) {
        return createVNode(
            McMenuItemGroup,
            { indent, disabled, title: label, style, class: itemClass },
            {
                default: () => (children ?? []).map(item => createMenu(item))
            }
        );
    } else if (children) {
        return createVNode(
            McSubMenu,
            { key, indent, disabled, unique, title: label, style, class: itemClass },
            {
                icon,
                default: () => children.map(item => createMenu(item))
            }
        );
    } else {
        return createVNode(
            McMenuItem,
            { key, indent, disabled, style, class: itemClass },
            {
                icon,
                default: typeof label === 'string' ? () => label : label
            }
        );
    }
}

export function findPath(tree: KeyTree[], key: Key, path: Key[] = []): Key[] | undefined {
    for (let i = 0; i < tree.length; i++) {
        const tempPath = [...path];
        tempPath.push(tree[i].key);
        if (tree[i].key === key) return tempPath;
        if (tree[i].children) {
            const result = findPath(tree[i].children!, key, tempPath);
            if (result) return result;
        }
    }
}

export function findNode(tree: KeyTree[], key: Key): KeyTree | undefined {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].key === key) return tree[i];
        if (tree[i].children) {
            const result = findNode(tree[i].children!, key);
            if (result) return result;
        }
    }
}

export function findParent(tree: KeyTree[] | MenuOption[], key: Key): KeyTree | MenuOption | undefined {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            const index = tree[i].children!.findIndex((item: KeyTree | MenuOption) => item.key === key);
            if (index > -1) return tree[i];
            const result = findParent(tree[i].children!, key);
            if (result) return result;
        }
    }
}
