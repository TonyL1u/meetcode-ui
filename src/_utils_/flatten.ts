import { Fragment, Comment, VNode } from 'vue';

export function flatten(vNodes: Array<VNode>, identificationKey: Symbol | null = null, result: Array<VNode> = []) {
    const filterVNodes = identificationKey ? vNodes.filter(vNode => (vNode.type as any).iKey === identificationKey || vNode.type === Fragment) : vNodes;
    for (const vNode of filterVNodes) {
        if (vNode.type === Fragment) {
            flatten(vNode.children as Array<VNode>, identificationKey, result);
        } else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }

    return result;
}
