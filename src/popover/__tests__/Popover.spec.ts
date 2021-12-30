import { mount } from '@vue/test-utils';
import { createVNode } from 'vue';
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

const _mount = (template: string, data?: () => unknown, args?: Record<string, unknown>) => {
    return mount({
        components: { McPopover },
        template,
        data,
        ...args
    });
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

    it('manual', async () => {
        const wrapper = _mount(
            `
        <McPopover trigger="manual" :show="show">
            <button class="manual-test-trigger" @click="show = !show"></button>
            <template #content>
                <div class="manual-test-content"></div>
            </template>
        </McPopover>`,
            () => {
                return {
                    show: false
                };
            }
        );

        const triggerWrapper = wrapper.find('.manual-test-trigger');
        await triggerWrapper.trigger('click');
        await sleep(50);
        expect(document.querySelector('.manual-test-content')).not.toBe(null);

        await triggerWrapper.trigger('click');
        await sleep(50);
        expect(document.querySelector('.manual-test-content')).toBe(null);
        wrapper.unmount();
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
            style: { 'font-size': '20px', padding: '0px' },
            withArrow: false
        });

        await triggerWrapper.trigger('click');
        await sleep(50);
        expect(document.querySelector('.mc-popover')?.className).toContain('mc-bg-red-500');
        expect((document.querySelector('.mc-popover') as HTMLElement).style).toMatchObject({ 'font-size': '20px', padding: '0px' });
        expect(document.querySelector('.mc-popover__arrow')).toBe(null);
        wrapper.unmount();
    });

    it('delay', async () => {
        const wrapper = mount(McPopover, {
            props: {
                trigger: 'click',
                showDelay: 300,
                hideDelay: 300
            },
            slots: {
                default: () => createVNode('button', { class: 'test-trigger' }),
                content: () => createVNode('div', { class: 'test-content' })
            }
        });

        const triggerWrapper = wrapper.find('.test-trigger');
        await triggerWrapper.trigger('click');
        await sleep(150);
        expect(document.querySelector('.test-content')).toBe(null);

        await sleep(300);
        expect(document.querySelector('.test-content')).not.toBe(null);

        await triggerWrapper.trigger('click');
        await sleep(150);
        expect(document.querySelector('.test-content')).not.toBe(null);

        await sleep(300);
        expect(document.querySelector('.test-content')).toBe(null);
    });
});
