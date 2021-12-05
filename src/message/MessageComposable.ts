import { reactive, toRef, watch, ref, toRefs } from 'vue';
import { reactivePick, toReactive, reactifyObject } from '@vueuse/core';
import { MessageApi, MessageInstanceOptions, MessageApiOptions, MaybeMessageApiOptions, MessageType, Message } from './interface';
import * as CSS from '@vue/runtime-dom/node_modules/csstype';

const MessageReactiveList = reactive<Message[]>([]);
function createMessage(message: Message) {
    MessageReactiveList.push(message);
}

function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions, type?: MessageType): MessageApiOptions<T> {
    let apiOptions: MessageApiOptions;

    if (maybeOptions) {
        if (typeof maybeOptions === 'string') {
            const reactiveOptions = reactive(options!);
            apiOptions = reactive(
                toRefs<MessageApiOptions>({
                    message: maybeOptions,
                    ...options
                })
            );
            console.log(apiOptions);
        } else {
            apiOptions = toRefs<MessageApiOptions>(maybeOptions);
        }
    } else {
        apiOptions = toRefs<MessageApiOptions>(options!);
    }
    createMessage({
        type: type!,
        options: apiOptions
    });
    watch(apiOptions, () => {
        console.log(apiOptions);
        console.log(MessageReactiveList);
    });
    return apiOptions;
}

const McMessage: MessageApi = (options: MessageInstanceOptions): MessageInstanceOptions => {
    const reactiveOptions = reactive(options);
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactivePick<MessageInstanceOptions, keyof MessageApiOptions>(reactiveOptions, 'message', 'className', 'closable', 'duration', 'style');
    createMessage({
        type,
        options: apiOptions
    });
    watch([apiOptions, type], () => {
        console.log(type);
        console.log(apiOptions);
        console.log(MessageReactiveList);
    });
    return reactiveOptions;
};
McMessage.text = (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => {
    return ApiConstructor<'text'>(maybeOptions, options, 'text');
};
McMessage.success = (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => {
    return ApiConstructor<'success'>(maybeOptions, options, 'success');
};
McMessage.warning = (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => {
    return ApiConstructor<'warning'>(maybeOptions, options, 'warning');
};
McMessage.info = (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => {
    return ApiConstructor<'info'>(maybeOptions, options, 'info');
};
McMessage.error = (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => {
    return ApiConstructor<'error'>(maybeOptions, options, 'error');
};
export default MessageReactiveList;
export { McMessage };
