import { reactive, render, createVNode, ref, toRefs } from 'vue';
import { responsiveTarget, createKey } from '../_utils_';
import { MessageApiOptions, MaybeMessageApiOptions, MessageType, Message, MessageApiInstance, CreateMessageOptions } from './interface';
import MessageEnvironment from './MessageEnvironment.vue';
import * as CSS from '@vue/runtime-dom/node_modules/csstype';

const MessageGlobalContainer: HTMLDivElement = document.createElement('div');
const containerMounted = ref(false);
MessageGlobalContainer.className = 'mc-message-global-container';
const MessageReactiveList = reactive<Message[]>([]);

function mountContainer() {
    render(createVNode(MessageEnvironment), MessageGlobalContainer);
    document.body.appendChild(MessageGlobalContainer);
    containerMounted.value = true;
}

function unmountContainer() {
    render(null, MessageGlobalContainer);
    document.body.removeChild(MessageGlobalContainer);
    containerMounted.value = false;
}

function createMessage(options: CreateMessageOptions) {
    const key = createKey('message');
    // @ts-ignore
    MessageReactiveList.push({ key, ...options });
}

function destroyMessage(key: string) {
    const index = MessageReactiveList.findIndex(m => m.key === key);
    MessageReactiveList.splice(index, 1);
}

function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options?: MessageApiOptions<T>, type?: MessageType, async?: false): MessageApiInstance<T>;
function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options?: MessageApiOptions<T>, type?: MessageType, async?: true): Promise<MessageApiInstance<T>>;
function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options: MessageApiOptions<T> = {}, type: MessageType = 'text', async: boolean = false): MessageApiInstance<T> | Promise<MessageApiInstance<T>> {
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
        type,
        options: apiOptions
    });

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
export { createMessage, destroyMessage, ApiConstructor, containerMounted, mountContainer, unmountContainer };
