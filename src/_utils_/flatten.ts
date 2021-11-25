import { Fragment, Comment, VNode } from 'vue';

/**
 *
 * @param vNodes flatten target
 * @param identificationKey filter key
 * @param mode When mode is true, every elements in vNodes which iKey === identificationKey will be filtered
 * @param result
 * @returns
 */

export function flatten(vNodes: Array<VNode>, identificationKey: Symbol | Symbol[] | null = null, mode = false, result: Array<VNode> = []) {
    const filterVNodes = identificationKey
        ? vNodes.filter(vNode => {
              const { iKey } = <any>vNode.type;
              const isAuth = Array.isArray(identificationKey) ? (mode ? !identificationKey.includes(iKey) : identificationKey.includes(iKey)) : mode ? iKey !== identificationKey : iKey === identificationKey;
              return isAuth || vNode.type === Fragment;
          })
        : vNodes;

    for (const vNode of filterVNodes) {
        if (vNode.type === Fragment) {
            flatten(vNode.children as Array<VNode>, identificationKey, mode, result);
        } else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }

    return result;
}
