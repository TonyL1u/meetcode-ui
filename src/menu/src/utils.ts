import { createVNode } from 'vue';
import { flatten } from '../../_utils_';
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

export function createMenu(option: MenuOption) {
    const { key, label, icon, intent, unique, group, children } = option;
    if (group) {
        return createVNode(
            McMenuItemGroup,
            { intent, title: label },
            {
                default: () => (children ?? []).map(item => createMenu(item))
            }
        );
    } else if (children) {
        return createVNode(
            McSubMenu,
            { key, intent, unique, title: label },
            {
                icon,
                default: () => children.map(item => createMenu(item))
            }
        );
    } else {
        return createVNode(
            McMenuItem,
            { key, intent },
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

export function findParent(tree: KeyTree[], key: Key): KeyTree | undefined {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            const index = tree[i].children!.findIndex(item => item.key === key);
            if (index > -1) return tree[i];
            const result = findParent(tree[i].children!, key);
            if (result) return result;
        }
    }
}
