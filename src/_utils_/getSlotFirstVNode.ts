import { Slot, VNode, RendererNode, RendererElement } from 'vue';
import { flatten } from './flatten';

type SpecificVNode<T> = VNode<RendererNode, RendererElement, T & { [key: string]: any }>;

function getSlotFirstVNode<T>(slot: Slot | undefined, identificationKey: Symbol | null, flattenedData: true): { firstVNode: SpecificVNode<T> | null; flattened: SpecificVNode<T>[] | null };

function getSlotFirstVNode<T>(slot: Slot | undefined, identificationKey: Symbol | null): SpecificVNode<T> | null;

function getSlotFirstVNode<T>(slot: Slot | undefined): SpecificVNode<T> | null;

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
