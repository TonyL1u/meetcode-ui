import { Slots, renderSlot, createTextVNode, RenderFunction, VNodeChild } from 'vue';

export function propsMergeSlots<T extends object, K extends keyof T>(props: T, slots: Slots, name: K, stringRenderer?: (prop: string) => VNodeChild, vnodeRenderer?: (vnode: VNodeChild) => VNodeChild) {
    const propValue = props[name] as unknown as string | RenderFunction;
    const renderProp = propValue ? (typeof propValue === 'string' ? (stringRenderer ? stringRenderer(propValue) : createTextVNode(propValue)) : vnodeRenderer ? vnodeRenderer(propValue()) : propValue()) : null;
    return slots[name as string] ? renderSlot(slots, name as string) : renderProp;
}
