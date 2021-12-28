import { mount } from '@vue/test-utils';
import { createVNode, nextTick } from 'vue';
import { McPopover } from '../index';

describe('mc-popover', () => {
    it('basic', async () => {
        const wrapper = mount(McPopover, {
            props: {
                trigger: 'click',
                showDelay: 0,
                show: true
            },
            slots: {
                default: () => createVNode('button', { id: 'hover' }),
                content: () => createVNode('div', { class: 'hover-test-content' })
            }
        });
        const triggerWrapper = wrapper.find('#hover');
        await triggerWrapper.trigger('click');
        nextTick(() => {
            console.log(document.body.innerHTML);
        });
        // expect(document.body.querySelector('.hover-test-content')).not.toBe(null);
        wrapper.unmount();
    });
});
