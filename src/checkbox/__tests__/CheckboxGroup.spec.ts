import { mount } from '@vue/test-utils';
import { createVNode, nextTick } from 'vue';
import { CheckboxGroupProps } from '../interface';
import { McCheckboxGroup, McCheckbox } from '../index';

const _mount = (template: string, data?: () => unknown, args?: Record<string, unknown>) => {
    return mount({
        components: { McCheckboxGroup, McCheckbox },
        template,
        data,
        ...args
    });
};

describe('mc-checkbox-group', () => {
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'orange', label: 'Orange' },
        { value: 'banana', label: 'Banana' }
    ];

    it('basic', () => {
        const wrapper = mount(McCheckboxGroup, {
            slots: {
                default: () => [createVNode(McCheckbox, { value: 'apple' }, { default: () => 'Apple' }), createVNode(McCheckbox, { value: 'orange' }, { default: () => 'Orange' }), createVNode(McCheckbox, { value: 'banana' }, { default: () => 'Banana' })]
            }
        });

        expect(wrapper.findAllComponents(McCheckbox).length).toBe(3);
        wrapper.unmount();
    });

    it('options', () => {
        const wrapper = mount(McCheckboxGroup, {
            props: { options },
            slots: { default: () => createVNode(McCheckbox, { value: 'peach' }, { default: () => 'Peach' }) }
        });

        expect(wrapper.findAllComponents(McCheckbox).length).toBe(4);
        wrapper.unmount();
    });

    it('value-bind', () => {
        const wrapper = _mount(`<McCheckboxGroup v-model:value="value" :options="options"></McCheckboxGroup>`, () => {
            return {
                value: [],
                options
            };
        });

        wrapper.findAllComponents(McCheckbox).forEach(async checkbox => {
            const checkboxInput = checkbox.find('input[type=checkbox]');
            await checkboxInput.setValue();
        });
        expect((wrapper.vm as CheckboxGroupProps).value).toEqual(['apple', 'orange', 'banana']);
        wrapper.unmount();
    });

    it('max', () => {
        const wrapper = mount(McCheckboxGroup, {
            props: {
                options,
                value: ['apple'],
                max: 1
            }
        });

        void nextTick(() => {
            expect(wrapper.findAll('.mc-checkbox--disabled').length).toBe(2);
            wrapper.unmount();
        });
    });

    it('disabled', () => {
        const wrapper = mount(McCheckboxGroup, { props: { options, disabled: true } });

        expect(wrapper.findAll('.mc-checkbox--disabled').length).toBe(3);
        wrapper.unmount();
    });

    it('event', () => {
        const onUpdateValue = jest.fn();
        const wrapper = mount(McCheckboxGroup, {
            props: { 'onUpdate:value': onUpdateValue, options }
        });

        wrapper.findAllComponents(McCheckbox).forEach(async checkbox => {
            const checkboxInput = checkbox.find('input[type=checkbox]');
            await checkboxInput.setValue();
        });

        void nextTick(() => {
            expect(onUpdateValue).toHaveBeenCalledTimes(3);
            wrapper.unmount();
        });
    });
});
