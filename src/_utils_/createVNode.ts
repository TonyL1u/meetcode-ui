import { createVNode } from 'vue';
import type { Component, VNodeProps, VNode } from 'vue';

export function createCpnVNode<P extends object, S extends string>(component: Component, props?: (P & (Record<string, unknown> & VNodeProps)) | null, children?: Record<S, () => VNode>, ...args: any[]): VNode;
export function createCpnVNode<P extends object>(component: Component, props?: (P & (Record<string, unknown> & VNodeProps)) | null, children?: unknown[] | Record<string, () => VNode>, ...args: any[]) {
    return createVNode(component, props, children, ...args);
}
