import { Fragment, Comment } from 'vue';
import { omit } from 'lodash-es';
import type { CustomVNodeTypes, Slots } from 'vue';
import type { SpecificVNode } from './tsutils';

export interface FlattenOptions {
    slots?: Slots;
    name?: string;
    key?: Symbol | Symbol[];
    infinity?: boolean;
}

/**
 *
 * @param vNodes flatten target
 * @param identificationKey filter key
 * @param mode When mode is true, every elements in vNodes which iKey === identificationKey will be filtered
 * @param result
 * @returns
 */
export function flatten<T = Record<string, unknown>>(vNodes?: SpecificVNode<T>[], identificationKey?: Symbol | Symbol[], mode = false, result: SpecificVNode<T>[] = [], isInfinity = false) {
    if (!vNodes) return result;
    const auth = (key?: Symbol) => {
        return key ? (Array.isArray(identificationKey) ? (mode ? !identificationKey.includes(key) : identificationKey.includes(key)) : mode ? key !== identificationKey : key === identificationKey) : false;
    };
    const filterVNodes = identificationKey
        ? vNodes.filter(vNode => {
              const { iKey } = vNode.type as CustomVNodeTypes;
              return auth(iKey) || vNode.type === Fragment || isInfinity;
          })
        : vNodes;

    for (const vNode of filterVNodes) {
        const children = ((isInfinity ? (vNode.children as Record<'default', () => any>)?.default?.() : vNode.children) ?? []) as SpecificVNode<T>[];
        const { iKey } = vNode.type as CustomVNodeTypes;
        if (isInfinity && auth(iKey)) {
            result.push(vNode);
        } else if (vNode.type === Fragment || (isInfinity && children.length > 0)) {
            flatten(children, identificationKey, mode, result, isInfinity);
        } else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }

    return result;
}

export function flattenWithOptions<T = Record<string, unknown>>(options: FlattenOptions, mode = false, result: SpecificVNode<T>[] = []) {
    const { slots, name, key, infinity } = options;
    if (!slots?.[name || 'default']) return result;

    return flatten<T>(slots[name || 'default']?.() as SpecificVNode<T>[], key, mode, result, !!infinity);
}

export function flattenTree<T extends Partial<object & Record<K, T[]>>, K extends keyof T>(tree: T[], key: K, result: Omit<T, K>[] = []) {
    tree.forEach(item => {
        result.push(omit(item, key));
        if (item[key]) {
            flattenTree(item[key]!, key, result);
        }
    });

    return result;
}
