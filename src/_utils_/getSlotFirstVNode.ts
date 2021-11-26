import { Slot, VNode, RendererNode, RendererElement } from 'vue';
import { flatten } from './flatten';

type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

type TupleData<T> = [SpecificVNode<T> | null, SpecificVNode<T>[] | null];

function getSlotFirstVNode<T = { [key: string]: any }>(slot: Slot | undefined, identificationKey: Symbol | Symbol[] | null, flattenedData: true): TupleData<T>;

function getSlotFirstVNode<T = { [key: string]: any }>(slot: Slot | undefined, identificationKey?: Symbol | Symbol[] | null, flattenedData?: false): SpecificVNode<T> | null;

function getSlotFirstVNode(slot: Slot | undefined, identificationKey: Symbol | Symbol[] | null = null, flattenedData = false) {
    const flattened = slot ? flatten(slot(), identificationKey) : null;
    const firstVNode = flattened?.[0] ?? null;
    if (!flattenedData) return firstVNode;

    return [firstVNode, flattened];
}

export { getSlotFirstVNode };
