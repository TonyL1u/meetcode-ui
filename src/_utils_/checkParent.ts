import { getCurrentInstance } from 'vue';
import type { CustomVNodeTypes, ComponentInternalInstance } from 'vue';

export function checkParent(parentKey: Symbol, internalParent?: ComponentInternalInstance | null): boolean {
    const mergedParent = internalParent ?? getCurrentInstance()?.parent;
    if (mergedParent?.type.name === 'BaseTransition' || mergedParent?.type.name === 'FadeInExpandTransition' || mergedParent?.type.displayName === 'Transition') return checkParent(parentKey, mergedParent.parent);
    return !!(mergedParent && (mergedParent.type as CustomVNodeTypes).iKey === parentKey);
}
