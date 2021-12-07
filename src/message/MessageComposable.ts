import { reactive, toRef, watch, ref, toRefs } from 'vue';
import { responsiveTarget } from '../_utils_';
import { MessageApiOptions, MaybeMessageApiOptions, MessageType, Message, MessageApiInstance } from './interface';
import * as CSS from '@vue/runtime-dom/node_modules/csstype';

const MessageReactiveList = reactive<Message[]>([]);
const MessageCounter = ref(0);

function destroyAllMessage() {
    // can't do this directly: MessageReactiveList = []
    MessageReactiveList.length = 0;
}

function createMessage(message: Message) {
    // @ts-ignore
    MessageReactiveList.push(message);
    MessageCounter.value++;
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
                resolve(apiOptions);
            };
        });
    }
    return apiOptions;
}

export default MessageReactiveList;
export { MessageCounter, destroyAllMessage, createMessage, ApiConstructor };
