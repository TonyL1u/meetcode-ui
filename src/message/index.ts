// export { default as McMessage } from './Message.vue';
import { createVNode, FunctionalComponent, render, computed, Fragment, VNode } from 'vue';
import MessageEntity from './Message.vue';

const container = document.createElement('div');
container.className = `mc-message-container`;
const messages: VNode[] = [];
class McMessage {}
const MsgListVNode = computed(() => {
    return createVNode(Fragment, null, messages);
});

const MessageApi = {
    success() {
        messages.push(createVNode(MessageEntity));
        render(MsgListVNode.value, container);
        console.log(MsgListVNode.value);
        console.log(container);
        document.body.appendChild(container);
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

const msg: FunctionalComponent = () => {
    return createVNode(McMessage);
};

export { msg };
