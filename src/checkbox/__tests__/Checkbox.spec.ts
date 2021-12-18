import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import { McCheckbox } from '../index';

const _mount = (template: string, data?: () => unknown) => {
    return mount({
        components: { McCheckbox },
        template,
        data
    });
};

describe('mc-checkbox', () => {
    it('basic', async () => {
        const wrapper = _mount('<McCheckbox v-model:value="value">Test</McCheckbox>', () => {
            return {
                value: false
            };
        });
        expect(wrapper.classes()).toContain('mc-checkbox');
        const checkboxInput = wrapper.find('input[type=checkbox]');
        await checkboxInput.setValue();
        // @ts-ignore
        expect(wrapper.vm.value).toBe(true);
        wrapper.unmount();
    });

    it('label', () => {
        // label in props
        const wrapper1 = _mount('<McCheckbox label="Test"></McCheckbox>');
        const label1 = wrapper1.find('.checkbox span:last-child');
        expect(label1.text()).toBe('Test');
        wrapper1.unmount();

        // label in slots
        const wrapper2 = _mount('<McCheckbox label="Test1">Test2</McCheckbox>');
        const label2 = wrapper2.find('.checkbox span:last-child');
        expect(label2.text()).toBe('Test2');
        wrapper2.unmount();
    });

    it('size', () => {
        const wrapper = _mount(`
            <McCheckbox id="small" size="small">Test</McCheckbox>
            <McCheckbox id="medium" size="medium">Test</McCheckbox>
            <McCheckbox id="large" size="large">Test</McCheckbox>
        `);

        console.log(wrapper.html());
        const small = wrapper.find('#small');
        console.log(small.html());
    });
});
