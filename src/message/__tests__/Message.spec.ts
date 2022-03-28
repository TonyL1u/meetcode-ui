import { mount } from '@vue/test-utils';
import { reactive, isReactive, nextTick } from 'vue';
import MessageEnvironment from '../MessageEnvironment';
import Message from '../Message';
import MessageReactiveList from '../MessageComposable';
import { McMessage, MessageApiOptions, MessageOptions, MessageType } from '../index';

describe('mc-message', () => {
    const options: MessageOptions = {
        type: 'info',
        message: 'test',
        duration: 0,
        closable: true
    };
    const apiOptions: MessageApiOptions<MessageType> = {
        message: 'test',
        duration: 0,
        closable: true
    };

    it('basic', async () => {
        const wrapper = mount(MessageEnvironment);
        McMessage(options);
        McMessage.text(apiOptions);
        McMessage.success(apiOptions);
        McMessage.warning(apiOptions);
        McMessage.info('info', apiOptions);
        McMessage.error();

        await nextTick();
        expect(wrapper.findAllComponents(Message).length).toBe(6);

        // reset
        wrapper.unmount();
        MessageReactiveList.length = 0;
    });

    it('duration', done => {
        const wrapper = mount(MessageEnvironment);
        McMessage({
            message: 'duration test',
            duration: 1000
        });

        void nextTick(() => {
            setTimeout(() => {
                expect(wrapper.findAllComponents(Message).length).toBe(1);
            }, 500);

            setTimeout(() => {
                expect(wrapper.findAllComponents(Message).length).toBe(0);

                // reset
                wrapper.unmount();
                MessageReactiveList.length = 0;
                done();
            }, 1200);
        });
    });

    it('closable', async () => {
        const wrapper = mount(MessageEnvironment);
        const message = McMessage(options);

        await nextTick();
        expect(wrapper.findAllComponents(Message).length).toBe(1);
        message.close();

        await nextTick();
        expect(wrapper.findAllComponents(Message).length).toBe(0);

        // reset
        wrapper.unmount();
        MessageReactiveList.length = 0;
    });

    it('raw-options', () => {
        const message = McMessage(options);
        expect(message).not.toBe(options);
        expect(isReactive(message)).toBe(true);
        message.message = 'modify';
        expect(options.message).toBe('test');

        const textMessage = McMessage.text(apiOptions);
        expect(textMessage).not.toBe(options);
        expect(isReactive(textMessage)).toBe(true);
        options.message = 'modify text';
        expect(textMessage.message).toBe('test');

        // reset
        MessageReactiveList.length = 0;
    });

    it('reactive-options', () => {
        const reactiveOptions = reactive(options);
        const reactiveApiOptions = reactive(apiOptions);

        const message = McMessage(reactiveOptions);
        expect(message).toBe(reactiveOptions);
        message.message = 'modify';
        expect(reactiveOptions.message).toBe('modify');

        const textMessage = McMessage.text(reactiveApiOptions);
        expect(textMessage).not.toBe(reactiveApiOptions);
        reactiveApiOptions.message = 'modify text';
        expect(reactiveApiOptions.message).toBe('modify text');

        // reset
        MessageReactiveList.length = 0;
    });
});
