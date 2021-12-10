import { watch } from 'vue';
import MessageReactiveList, { containerMounted, mountContainer } from './MessageComposable';
import './style.scss';
export { default as McMessage } from './MessageApi';
export { default as McAsyncMessage } from './MessageAsyncApi';
export type { MessageInstance, MessageOptions, MessageApiInstance, MessageApiOptions, MessageType } from './interface';

watch(MessageReactiveList, () => {
    if (!containerMounted.value && MessageReactiveList.length > 0) {
        mountContainer();
    }
});
