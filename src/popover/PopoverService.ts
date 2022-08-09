import { createVNode, render, ref } from 'vue';
import Popover from './Popover';
import type { VNode } from 'vue';

export function McPopoverService(attachment: VNode) {
    console.log(attachment);
    const PopoverHostElement = ref<HTMLDivElement | null>(document.createElement('div'));
    const popoverVNode = () => {
        return createVNode(Popover, null, {
            default: () => createVNode(attachment),
            content: () => 'test'
        });
    };

    document.body.appendChild(PopoverHostElement.value!);

    render(createVNode(popoverVNode), PopoverHostElement.value!);
}
