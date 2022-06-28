import { camelToKebab } from './kebabCaseEscape';
import { renderSlot, createTextVNode } from './renderFunction';
import type { Slots, RenderFunction, VNodeChild, VNode } from 'vue';

export function propsMergeSlots<T extends Record<string, any>, K extends keyof T>(props: T, slots: Slots, name: K, stringRenderer?: (prop: string) => VNodeChild, vnodeRenderer?: (vnode: VNodeChild) => VNodeChild): VNodeChild {
    const propValue = (props ?? {})[name] as string | RenderFunction;
    const renderProp = propValue ? (typeof propValue === 'string' ? (stringRenderer ? stringRenderer(propValue) : createTextVNode(propValue)) : vnodeRenderer ? vnodeRenderer(propValue()) : propValue()) : null;
    const kebabKey = camelToKebab(name as string);
    return slots[name as string] || slots[kebabKey] ? renderSlot(slots, camelToKebab(name as string)) : renderProp;
}
