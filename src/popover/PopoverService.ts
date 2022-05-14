import { createVNode, render, ref } from 'vue';
import Popover from './Popover';

export function McPopoverService(attachment: HTMLElement) {
    const PopoverHostElement = ref<HTMLDivElement | null>(document.createElement('div'));
    const popoverVNode = () => {
        return createVNode(Popover, null, {
            default: () => createVNode(attachment),
            content: () => 'test'
        });
    };

    render(createVNode(popoverVNode), PopoverHostElement.value!);
}
