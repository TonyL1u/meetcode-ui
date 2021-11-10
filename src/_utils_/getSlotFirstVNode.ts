import { VNode, Slot } from 'vue';
import { flatten } from './index';

export function getSlotFirstVNode(slot: Slot | undefined): VNode | null {
    return slot ? flatten(slot())[0] : null;
}
