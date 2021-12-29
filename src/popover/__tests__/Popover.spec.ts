import { mount, VueWrapper } from '@vue/test-utils';
import { createVNode, nextTick } from 'vue';
import { McPopover, PopoverTrigger, PopoverProps, PopoverExposeInstance } from '../index';

const Wrapper = (trigger: PopoverTrigger, props?: PopoverProps & Record<string, unknown>) => {
    const wrapper = mount(McPopover, {
        attachTo: document.body,
        props: {
            ...props,
            trigger,
            showDelay: 0,
            hideDelay: 0
        },
        slots: {
            default: () => createVNode('button', { class: `${trigger}-test-trigger` }),
            content: () => createVNode('div', { class: `${trigger}-test-content` })
        }
    });
    const triggerWrapper = wrapper.find(`.${trigger}-test-trigger`);
    const contentSelector = `.${trigger}-test-content`;

    return { wrapper, triggerWrapper, contentSelector };
};

const sleep = (ms: number) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

describe('mc-popover', () => {
    it('basic', async () => {
        // hover
        const { wrapper: wrapper1, triggerWrapper: trigger1, contentSelector: selector1 } = Wrapper('hover');

        await trigger1.trigger('mouseenter');
        await sleep(50);
        expect(document.querySelector(selector1)).not.toBe(null);

        await trigger1.trigger('mouseleave');
        await sleep(50);
        expect(document.querySelector(selector1)).toBe(null);
        wrapper1.unmount();

        // click
        const { wrapper: wrapper2, triggerWrapper: trigger2, contentSelector: selector2 } = Wrapper('click');

        await trigger2.trigger('click');
        await sleep(50);
        expect(document.querySelector(selector2)).not.toBe(null);

        await trigger2.trigger('click');
        await sleep(50);
        expect(document.querySelector(selector2)).toBe(null);
        wrapper2.unmount();
    });

    it('destroy-when-hide', async () => {
        const { wrapper, triggerWrapper, contentSelector } = Wrapper('click', {
            destroyWhenHide: false
        });

        await triggerWrapper.trigger('click');
        await sleep(50);
        expect(document.querySelector(contentSelector)).not.toBe(null);

        const instance = wrapper.vm as unknown as PopoverExposeInstance;
        instance.hide();
        await sleep(50);
        expect(document.querySelector(contentSelector)).not.toBe(null);
        wrapper.unmount();
    });

    it('content-style', async () => {
        const { wrapper, triggerWrapper } = Wrapper('click', {
            class: 'mc-bg-red-500',
            style: { 'font-size': '20px', padding: '0px' }
        });

        await triggerWrapper.trigger('click');
        await sleep(50);
        expect(document.querySelector('.mc-popover')?.className).toContain('mc-bg-red-500');
        expect((document.querySelector('.mc-popover') as HTMLElement).style).toMatchObject({ 'font-size': '20px', padding: '0px' });
    });
});
