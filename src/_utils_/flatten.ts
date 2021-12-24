import { Fragment, Comment, CustomVNodeTypes } from 'vue';
import { SpecificVNode } from './tsutils';
/**
 *
 * @param vNodes flatten target
 * @param identificationKey filter key
 * @param mode When mode is true, every elements in vNodes which iKey === identificationKey will be filtered
 * @param result
 * @returns
 */
export function flatten<T = Record<string, unknown>>(vNodes: Array<SpecificVNode<T>>, identificationKey?: Symbol | Symbol[], mode = false, result: Array<SpecificVNode<T>> = []) {
    const filterVNodes = identificationKey
        ? vNodes.filter(vNode => {
              const { iKey } = vNode.type as CustomVNodeTypes;
              const isAuth = iKey ? (Array.isArray(identificationKey) ? (mode ? !identificationKey.includes(iKey) : identificationKey.includes(iKey)) : mode ? iKey !== identificationKey : iKey === identificationKey) : false;
              return isAuth || vNode.type === Fragment;
          })
        : vNodes;

    for (const vNode of filterVNodes) {
        if (vNode.type === Fragment) {
            flatten(vNode.children as Array<SpecificVNode<T>>, identificationKey, mode, result);
        } else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }

    return result;
}
