import { mount } from '@vue/test-utils';
import { CheckboxProps } from '../interface';
import { McCheckbox } from '../index';

const _mount = (template: string, data?: () => unknown, args?: Record<string, unknown>) => {
    return mount({
        components: { McCheckbox },
        template,
        data,
        ...args
    });
};

describe('mc-checkbox', () => {
    it('basic', async () => {
        const wrapper = mount(McCheckbox);
        expect(wrapper.classes()).toContain('mc-checkbox');
        wrapper.unmount();
    });

    it('value-bind', async () => {
        const wrapper = _mount('<McCheckbox v-model:value="value">Test</McCheckbox>', () => {
            return {
                value: false
            };
        });

        const checkboxInput = wrapper.find('input[type=checkbox]');
        await checkboxInput.setValue();
        expect((wrapper.vm as CheckboxProps).value).toBe(true);
        wrapper.unmount();
    });

    it('label', () => {
        // label in props
        const wrapper1 = mount(McCheckbox, {
            props: {
                label: 'Test'
            }
        });
        const label1 = wrapper1.find('.checkbox span:last-child');
        expect(label1.text()).toBe('Test');
        wrapper1.unmount();

        // label in slots will override the label in props
        const wrapper2 = mount(McCheckbox, {
            props: {
                label: 'Test1'
            },
            slots: {
                default: () => 'Test2'
            }
        });
        const label2 = wrapper2.find('.checkbox span:last-child');
        expect(label2.text()).toBe('Test2');
        wrapper2.unmount();
    });

    it('size', () => {
        (['small', 'medium', 'large'] as const).forEach(size => {
            const wrapper = mount(McCheckbox, { props: { size } });
            expect(wrapper.attributes('style')).toMatchSnapshot();
            wrapper.unmount();
        });
    });

    it('check-value', async () => {
        const wrapper = _mount('<McCheckbox v-model:value="value" checked-value="yes" unchecked-value="no">Test</McCheckbox>', () => {
            return {
                value: 'no'
            };
        });

        const checkboxInput = wrapper.find('input[type=checkbox]');
        await checkboxInput.setValue();
        expect((wrapper.vm as CheckboxProps).value).toBe('yes');
        wrapper.unmount();
    });

    it('disabled', async () => {
        const wrapper = _mount('<McCheckbox v-model:value="value" disabled>Test</McCheckbox>', () => {
            return {
                value: false
            };
        });

        expect(wrapper.classes()).toContain('mc-checkbox--disabled');
        const checkboxInput = wrapper.find('input[type=checkbox]');
        await checkboxInput.setValue();
        expect((wrapper.vm as CheckboxProps).value).toBe(false);
        wrapper.unmount();
    });

    it('event', async () => {
        const onUpdateValue = jest.fn();
        const wrapper = mount(McCheckbox, { props: { 'onUpdate:value': onUpdateValue } });

        const checkboxInput = wrapper.find('input[type=checkbox]');
        await checkboxInput.setValue();
        expect(onUpdateValue).toBeCalled();
        wrapper.unmount();
    });
});
