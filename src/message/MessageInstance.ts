import { createVNode, reactive, VNode, toRefs, ref, Ref, nextTick, render, watch } from 'vue';
import { MessageGlobalContainer, Message, MessageApiOptions, MessageInstanceOptions, MessageType } from './interface';
import MessageEntity from './Message.vue';
import { MessageInstanceCount } from '.';

export default class MessageInstance<T> implements Message<T> {
    type!: T | MessageType;
    options: MessageApiOptions | MessageInstanceOptions;
    VNode!: VNode;
    wrapperEl!: HTMLElement;

    constructor(options: MessageApiOptions | MessageInstanceOptions, messageType?: T) {
        this.options = reactive(options);
        const { className, style, message, duration, closable, type } = toRefs(<MessageInstanceOptions>this.options);
        this.type = messageType ?? type.value ?? 'text';

        this.VNode = createVNode(
            MessageEntity,
            {
                class: className?.value,
                style: style?.value,
                type: this.type,
                duration: duration?.value,
                closable: closable?.value,
                onClose: () => {
                    setTimeout(() => {
                        this.close();
                    }, 100);
                }
            },
            {
                default: () => message?.value ?? ''
            }
        );
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'mc-message-wrapper';
    }

    close() {
        if (!this.wrapperEl) return;
        MessageGlobalContainer.removeChild(this.wrapperEl);
        render(null, this.wrapperEl);
        MessageInstanceCount.value--;
    }

    destroy() {}
}
