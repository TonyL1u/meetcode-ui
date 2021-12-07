import { mount } from '@vue/test-utils';
import { reactive, isReactive, nextTick } from 'vue';
import MessageEnvironment from '../MessageEnvironment.vue';
import Message from '../Message.vue';
import { McMessage, MessageApiOptions, MessageOptions, MessageType } from '../index';
import { MessageGlobalContainer } from '../interface';

const env = mount(MessageEnvironment);
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

    it('container destroy', () => {
        const textMessage = McMessage.text(apiOptions);
        void nextTick(() => {
            expect(MessageGlobalContainer.innerHTML).not.toBe('');

            textMessage.close!();
            setTimeout(() => {
                expect(MessageGlobalContainer.innerHTML).toBe('1');
            }, 300);
        });
    });

    it('basic', () => {
        McMessage(options);
        McMessage.text(apiOptions);
        McMessage.success(apiOptions);
        McMessage.warning(apiOptions);
        McMessage.info('info', apiOptions);
        McMessage.error();

        void nextTick(() => {
            expect(env.findAllComponents(Message).length).toBe(6);
        });
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
    });
});
