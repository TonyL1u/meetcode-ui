import { reactive, render, createVNode, ref, toRefs } from 'vue';
import { responsiveTarget, createKey } from '../_utils_';
import { MessageApiOptions, MaybeMessageApiOptions, MessageType, Message, MessageApiInstance } from './interface';
import MessageEnvironment from './MessageEnvironment';

const containerMounted = ref(false);
const MessageReactiveList: Message[] = reactive([]);

function mountContainer() {
    render(createVNode(MessageEnvironment), document.body);
    containerMounted.value = true;
}

function unmountContainer() {
    const container = document.querySelector('.mc-message-global-container');
    if (container) {
        document.body.removeChild(container);
    }
    containerMounted.value = false;
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
    let apiOptions: MessageApiOptions<T>;

    if (maybeOptions) {
        if (typeof maybeOptions === 'string') {
            const reactiveOptions = reactive({
                message: maybeOptions,
                ...options
            });
            apiOptions = reactive(toRefs<MessageApiOptions<T>>(reactiveOptions));
        } else {
            const reactiveOptions = responsiveTarget(maybeOptions);
            apiOptions = reactive(toRefs<MessageApiOptions<T>>(reactiveOptions));
        }
    } else {
        const reactiveOptions = responsiveTarget(options);
        apiOptions = reactive(toRefs<MessageApiOptions<T>>(reactiveOptions));
    }
    createMessage({
        key,
        type,
        options: apiOptions
    });
    (apiOptions as MessageApiInstance<T>).close = () => {
        apiOptions.onClose?.();
        closeMessage(key);
    };

    if (async) {
        return new Promise<MessageApiInstance<T>>(resolve => {
            const originalOnCloseHandler = apiOptions.onClose;
            apiOptions.onClose = async () => {
                originalOnCloseHandler && (await originalOnCloseHandler());
                resolve(apiOptions as MessageApiInstance<T>);
            };
        });
    }
    return apiOptions as MessageApiInstance<T>;
}

export default MessageReactiveList;
export { createMessage, closeMessage, ApiConstructor, containerMounted, mountContainer, unmountContainer };
