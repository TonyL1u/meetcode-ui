import { mount } from '@vue/test-utils';
import { createVNode } from 'vue';
import { McButton, McButtonGroup, ButtonGroupProps } from '../index';

const ButtonVNode = () => createVNode(McButton);

const Wrapper = (props?: ButtonGroupProps & Record<string, unknown>, buttonCount: number = 4) => {
    return mount(McButtonGroup, {
        props,
        slots: {
            default: () => Array(buttonCount).fill(ButtonVNode())
        }
    });
};

describe('mc-button-group', () => {
    it('basic', () => {
        const wrapper = Wrapper();

        expect(wrapper.findAllComponents(McButton).length).toBe(4);
        wrapper.unmount();
    });

    it('group size', () => {
        const wrapper = Wrapper({ size: 'large' }, 5);

        const buttons = wrapper.findAllComponents(McButton);
        expect(buttons.every(button => button.classes().includes('mc-button--large'))).toBe(true);
        wrapper.unmount();
    });

    it('vertical', () => {
        const wrapper = Wrapper({ vertical: true });

        expect(wrapper.classes()).toContain('mc-button-group--vertical');
        wrapper.unmount();
    });
});
