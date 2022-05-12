import { flatten } from './flatten';
import type { Slot, CustomVNodeTypes } from 'vue';
import type { SpecificVNode } from './tsutils';

type TupleData<T> = [SpecificVNode<T> | null, SpecificVNode<T>[] | null];

export function getSlotFirstVNode<T = Record<string, any>>(slots: Slot | undefined, identificationKey: Symbol | Symbol[], flattenedData: true): TupleData<T>;
export function getSlotFirstVNode<T = Record<string, any>>(slots: Slot | undefined, identificationKey?: Symbol | Symbol[], flattenedData?: false): SpecificVNode<T> | null;
export function getSlotFirstVNode(slots: Slot | undefined, identificationKey?: Symbol | Symbol[], flattenedData = false) {
    const flattened = slots ? flatten(slots(), identificationKey) : null;
    const firstVNode = flattened?.[0] ?? null;
    if (!flattenedData) return firstVNode;

    return [firstVNode, flattened];
}
export function getSlotVNodeIndex(slots?: Slot, key?: Symbol) {
    if (!key) return -1;
    return slots?.().findIndex(slot => (slot.type as CustomVNodeTypes).iKey === key) ?? -1;
}
