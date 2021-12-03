// export { default as McMessage } from './Message.vue';
import { createVNode, ComputedRef, computed, Ref, ref, toRefs, reactive, render, watchEffect, watch, Fragment, VNode, VNodeChild } from 'vue';
import MessageEntity from './Message.vue';
import type { MessageInstanceImpl, MessageApiOptions } from './interface';

class MessageInstance implements MessageInstanceImpl {
    type!: 'success' | 'warning' | 'info' | 'error';
    content: Ref<string>;
    node!: VNode;

    constructor(options: MessageApiOptions) {
        const { content } = toRefs(options);
        this.content = content!;
        this.node = createVNode(MessageEntity, null, {
            default: () => this.content.value
        });
    }

    close() {
        console.log(123);
        this.content.value = null;
    }

    destroy() {}
}
const container = document.createElement('div');
container.className = `mc_message_container`;
document.body.appendChild(container);

const vnodeList: VNode[] = [];
const MessageApi = {
    success(options: MessageApiOptions) {
        render(null, container);
        const instance = new MessageInstance(options);
        vnodeList.push(instance.node);
        console.log(vnodeList);

        render(createVNode(Fragment, null, vnodeList), container);
        return instance;
    },
    warning() {
        return createVNode(MessageEntity);
    },
    info() {
        return createVNode(MessageEntity);
    },
    error() {
        return createVNode(MessageEntity);
    }
};

export { MessageApi };
