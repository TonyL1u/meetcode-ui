import { mount } from '@vue/test-utils';
import { defineComponent, reactive, isReactive } from 'vue';
// import MessageEnvironment from './MessageEnvironment.vue';
import { McMessage, MessageApiOptions, MessageOptions } from '..';
import Test from './test.vue';

test('displays message', () => {
    const wrapper = mount(Test, {
        props: {
            msg: 'Hello world'
        }
    });

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world');
});

describe('mc-message', () => {
    it('raw-options', () => {
        const options: MessageOptions = {
            type: 'info',
            message: 'test',
            duration: 0,
            closable: true
        };

        const messageInstance = McMessage(options);

        expect(messageInstance).not.toBe(options);
        expect(isReactive(messageInstance)).toBe(true);
        messageInstance.message = 'modify test';
        expect(options.message).toBe('test');
    });
});
