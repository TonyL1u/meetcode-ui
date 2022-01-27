import { mount } from '@vue/test-utils';
import { McButton } from '../index';
import { JestComputedStyle } from '../../_utils_';

const Wrapper = (color?: { color?: string; textColor?: string; borderColor?: string }) => {
    return mount(McButton, { props: { type: 'custom', ...color } });
};

describe('mc-button', () => {
    it('basic', async () => {
        const wrapper = mount(McButton);
        expect(wrapper.classes()).toContain('mc-button');
        wrapper.unmount();
    });

    it('disabled', async () => {
        const onClick = jest.fn();
        const wrapper1 = mount(McButton, { props: { onClick } });
        const wrapper2 = mount(McButton, { props: { onClick, disabled: true } });

        await wrapper1.trigger('click');
        await wrapper2.trigger('click');
        expect(onClick).toBeCalledTimes(1);
        wrapper1.unmount();
        wrapper2.unmount();
    });

    it('custom color', async () => {
        let wrapper;
        let style: JestComputedStyle;
        const color = '#ff0000';
        const textColor = '#00ff00';
        const borderColor = '#0000ff';
        const getStyle = (el: Element) => getComputedStyle(el) as JestComputedStyle;

        wrapper = Wrapper();
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe('#000');
        expect(style._values['--button-default-border-color']).toBe('#e0e0e6');
        expect(style._values['--button-default-background-color']).toBe('#fff');
        wrapper.unmount();

        wrapper = Wrapper({ color });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe('#fff');
        expect(style._values['--button-default-border-color']).toBe(color);
        expect(style._values['--button-default-background-color']).toBe(color);
        wrapper.unmount();

        wrapper = Wrapper({ textColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe(textColor);
        expect(style._values['--button-default-border-color']).toBe('#e0e0e6');
        expect(style._values['--button-default-background-color']).toBe('#fff');
        wrapper.unmount();

        wrapper = Wrapper({ borderColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe('#000');
        expect(style._values['--button-default-border-color']).toBe(borderColor);
        expect(style._values['--button-default-background-color']).toBe('#fff');
        wrapper.unmount();

        wrapper = Wrapper({ color, textColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe(textColor);
        expect(style._values['--button-default-border-color']).toBe(color);
        expect(style._values['--button-default-background-color']).toBe(color);
        wrapper.unmount();

        wrapper = Wrapper({ textColor, borderColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe(textColor);
        expect(style._values['--button-default-border-color']).toBe(borderColor);
        expect(style._values['--button-default-background-color']).toBe('#fff');
        wrapper.unmount();

        wrapper = Wrapper({ color, borderColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe('#fff');
        expect(style._values['--button-default-border-color']).toBe(borderColor);
        expect(style._values['--button-default-background-color']).toBe(color);
        wrapper.unmount();

        wrapper = Wrapper({ color, textColor, borderColor });
        style = getStyle(wrapper.element);
        expect(style._values['--button-default-color']).toBe(textColor);
        expect(style._values['--button-default-border-color']).toBe(borderColor);
        expect(style._values['--button-default-background-color']).toBe(color);
        wrapper.unmount();
    });
});
