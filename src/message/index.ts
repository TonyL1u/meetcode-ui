import { render, watch, createVNode } from 'vue';
import { MessageCounter, destroyAllMessage } from './MessageComposable';
import MessageEnvironment from './MessageEnvironment.vue';
import { MessageGlobalContainer } from './interface';
import './style.scss';

let containerAppended = false;
watch(MessageCounter, () => {
    console.log(MessageCounter.value);
    if (MessageCounter.value === 0) {
        // setTimeout(() => {
        // remove message container when message list is empty
        render(null, MessageGlobalContainer);
        document.body.removeChild(MessageGlobalContainer);
        destroyAllMessage();
        containerAppended = false;
        // }, 300);
    } else if (!containerAppended) {
        render(createVNode(MessageEnvironment), MessageGlobalContainer);
        document.body.appendChild(MessageGlobalContainer);
        containerAppended = true;
    }
});

export { default as McMessage } from './MessageApi';
export { default as McAsyncMessage } from './MessageAsyncApi';
export type { MessageInstance, MessageOptions, MessageApiInstance, MessageApiOptions, MessageType } from './interface';
