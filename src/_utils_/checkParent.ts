import { getCurrentInstance, CustomVNodeTypes } from 'vue';

export function checkParent(parentKey: Symbol) {
    const { parent } = getCurrentInstance() ?? {};
    return !!(parent && (parent.type as CustomVNodeTypes).iKey === parentKey);
}
