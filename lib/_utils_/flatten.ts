import { Fragment, Comment, VNode } from 'vue';

export function flatten(vNodes: Array<VNode>, identificationKey: Symbol | null = null, result: Array<VNode> = []) {
    for (const vNode of vNodes) {
        if (identificationKey && (vNode.type as any).alias?.[0] === identificationKey) {
            result.push(vNode);
        } else if (vNode.type === Fragment) {
            flatten(vNode.children as Array<VNode>, identificationKey, result);
        } else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }

    return result;
}
