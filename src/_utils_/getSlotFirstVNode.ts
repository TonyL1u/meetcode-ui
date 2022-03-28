import { Slot } from 'vue';
import { flatten } from './flatten';
import { SpecificVNode } from './tsutils';

type TupleData<T> = [SpecificVNode<T> | null, SpecificVNode<T>[] | null];

function getSlotFirstVNode<T = Record<string, any>>(slot: Slot | undefined, identificationKey: Symbol | Symbol[], flattenedData: true): TupleData<T>;

function getSlotFirstVNode<T = Record<string, any>>(slot: Slot | undefined, identificationKey?: Symbol | Symbol[], flattenedData?: false): SpecificVNode<T> | null;

function getSlotFirstVNode(slot: Slot | undefined, identificationKey?: Symbol | Symbol[], flattenedData = false) {
    const flattened = slot ? flatten(slot(), identificationKey) : null;
    const firstVNode = flattened?.[0] ?? null;
    if (!flattenedData) return firstVNode;

    return [firstVNode, flattened];
}

export { getSlotFirstVNode };
