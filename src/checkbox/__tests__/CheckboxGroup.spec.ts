import { mount } from '@vue/test-utils';
import { createVNode, nextTick } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxValue, CheckboxGroupProps } from '../index';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'banana', label: 'Banana' }
];

const CheckboxVNode = (value: CheckboxValue) => {
    return createVNode(McCheckbox, { value });
};

const Wrapper = (props?: CheckboxGroupProps & Record<string, unknown>) => {
    return mount(McCheckboxGroup, { props: { options, ...props } });
};

describe('mc-checkbox-group', () => {
    it('basic', () => {
        const wrapper = mount(McCheckboxGroup, {
            slots: {
                default: () => [CheckboxVNode('apple'), CheckboxVNode('orange'), CheckboxVNode('banana')]
            }
        });

        expect(wrapper.findAllComponents(McCheckbox).length).toBe(3);
        wrapper.unmount();
    });

    it('options', () => {
        const wrapper = mount(McCheckboxGroup, {
            props: { options },
            slots: { default: () => CheckboxVNode('peach') }
        });

        expect(wrapper.findAllComponents(McCheckbox).length).toBe(4);
        wrapper.unmount();
    });

    it('value-bind', () => {
        const wrapper = Wrapper({ value: [] });

        wrapper.findAllComponents(McCheckbox).forEach(async checkbox => {
            const checkboxInput = checkbox.find('input[type=checkbox]');
            await checkboxInput.setValue();
        });
        expect(wrapper.props().value).toEqual(['apple', 'orange', 'banana']);
        wrapper.unmount();
    });

    it('max', async () => {
        const wrapper = Wrapper({ value: ['apple'], max: 1 });

        await nextTick();
        expect(wrapper.findAll('.mc-checkbox--disabled').length).toBe(2);
        wrapper.unmount();
    });

    it('disabled', () => {
        const wrapper = Wrapper({ disabled: true });

        expect(wrapper.findAll('.mc-checkbox--disabled')).toHaveLength(3);
        wrapper.unmount();
    });

    it('event', () => {
        const wrapper = Wrapper({ value: [] });

        wrapper.findAllComponents(McCheckbox).forEach(async checkbox => {
            const checkboxInput = checkbox.find('input[type=checkbox]');
            await checkboxInput.setValue();
        });

        expect(wrapper.emitted('update:value')).toHaveLength(3);
        wrapper.unmount();
    });

    it('select all & clear', async () => {
        const wrapper = Wrapper({ value: [] });
        const { selectAll, clear } = wrapper.vm as any;

        selectAll();
        await nextTick();
        expect(wrapper.findAll('.mc-checkbox--checked')).toHaveLength(3);
        expect((wrapper.vm as any).status.all).toBe(true);
        expect((wrapper.vm as any).status.indeterminate).toBe(false);
        console.log(wrapper.props());

        clear();
        await nextTick();
        expect(wrapper.findAll('.mc-checkbox--checked')).toHaveLength(0);
        expect((wrapper.vm as any).status.all).toBe(false);
        expect((wrapper.vm as any).status.indeterminate).toBe(false);
    });
});
