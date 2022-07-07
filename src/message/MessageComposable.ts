import { reactive, render, createVNode, ref, toRefs } from 'vue';
import { responsiveTarget, createKey } from '../_utils_';
import { MessageApiOptions, MaybeMessageApiOptions, MessageType, Message, MessageApiInstance } from './interface';
import MessageEnvironment from './MessageEnvironment';

const containerMounted = ref(false);
const MessageReactiveList: Message[] = reactive([]);

function mountContainer() {
    containerMounted.value = true;
    render(createVNode(MessageEnvironment), document.body);
}

function createMessage(message: Message) {
    MessageReactiveList.push(message);
}

function closeMessage(key: string) {
    const index = MessageReactiveList.findIndex(m => m.key === key);
    index > -1 && MessageReactiveList.splice(index, 1);
}

function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options?: MessageApiOptions<T>, type?: MessageType, async?: false): MessageApiInstance<T>;
function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options?: MessageApiOptions<T>, type?: MessageType, async?: true): Promise<MessageApiInstance<T>>;
function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options: MessageApiOptions<T> = {}, type: MessageType = 'text', async: boolean = false): MessageApiInstance<T> | Promise<MessageApiInstance<T>> {
    const key = createKey('message');
    const reactiveOptions = maybeOptions
        ? typeof maybeOptions === 'string'
            ? reactive({
                  message: maybeOptions,
                  ...options
              })
            : responsiveTarget(maybeOptions)
        : responsiveTarget(options);
    const apiOptions: MessageApiOptions<T> = reactive(toRefs<MessageApiOptions<T>>(reactiveOptions));

    createMessage({
        key,
        type,
        options: apiOptions
    });

    return async
        ? new Promise<MessageApiInstance<T>>(resolve => {
              const originalOnCloseHandler = apiOptions.onClose;
              apiOptions.onClose = async () => {
                  originalOnCloseHandler && (await originalOnCloseHandler());
                  resolve(apiOptions as MessageApiInstance<T>);
              };
          })
        : (apiOptions as MessageApiInstance<T>);
}

export default MessageReactiveList;
export { createMessage, closeMessage, ApiConstructor, containerMounted, mountContainer };
