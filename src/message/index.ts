// export { default as McMessage } from './Message.vue';
import { render, watch, createVNode } from 'vue';
import MessageReactiveList from './MessageComposable';
import MessageEnvironment from './MessageEnvironment.vue';
import './style.scss';

const MessageGlobalContainer: HTMLDivElement = document.createElement('div');
MessageGlobalContainer.className = 'mc-message-global-container';
let containerAppended = false;

watch(MessageReactiveList, list => {
    if (list.length === 0) {
        // remove message container when message list is empty
        render(null, MessageGlobalContainer);
        document.body.removeChild(MessageGlobalContainer);
        containerAppended = false;
    } else if (!containerAppended) {
        render(createVNode(MessageEnvironment), MessageGlobalContainer);
        document.body.appendChild(MessageGlobalContainer);
        containerAppended = true;
    }
});

export { McMessage } from './MessageComposable';
export type { MessageOptions, MessageApiOptions } from './interface';
