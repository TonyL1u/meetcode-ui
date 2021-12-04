import { createVNode, reactive, VNode, toRefs, Transition } from 'vue';
import { Message, MessageApiOptions } from './interface';
import MessageEntity from './Message.vue';

export default class MessageInstance<T> implements Message<T> {
    type!: T;
    options: MessageApiOptions;
    VNode!: VNode;
    wrapperEl!: HTMLElement;

    constructor(options: MessageApiOptions, type: T) {
        this.options = reactive(options);
        this.type = type;

        const { className, style, message } = toRefs(this.options);
        this.VNode = createVNode(
            MessageEntity,
            { class: className?.value, style: style?.value, type: this.type },
            {
                default: () => message?.value ?? ''
            }
        );

        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'mc-message-wrapper';
    }

    close() {}

    destroy() {}
}
