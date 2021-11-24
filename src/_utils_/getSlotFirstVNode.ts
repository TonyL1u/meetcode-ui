import { Slot, VNode, RendererNode, RendererElement } from 'vue';
import { flatten } from './flatten';

type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

function getSlotFirstVNode<T = { [key: string]: any }>(slot: Slot | undefined, identificationKey: Symbol | null, flattenedData: true): { firstVNode: SpecificVNode<T> | null; flattened: SpecificVNode<T>[] | null };

function getSlotFirstVNode<T = { [key: string]: any }>(slot: Slot | undefined, identificationKey?: Symbol | null, flattenedData?: false): SpecificVNode<T> | null;

function getSlotFirstVNode(slot: Slot | undefined, identificationKey: Symbol | null = null, flattenedData = false) {
    const flattened = slot ? flatten(slot(), identificationKey) : null;
    const firstVNode = flattened?.[0] ?? null;
    if (!flattenedData) return firstVNode;

    return {
        firstVNode,
        flattened
    };
}

export { getSlotFirstVNode };
