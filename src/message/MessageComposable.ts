import { reactive, toRef, watch, ref, toRefs } from 'vue';
import { reactivePick } from '@vueuse/core';
import { responsiveTarget } from '../_utils_';
import { MessageApi, MessageOptions, MessageApiOptions, MaybeMessageApiOptions, MessageType, Message, MessageInstance, MessageApiInstance } from './interface';
import * as CSS from '@vue/runtime-dom/node_modules/csstype';

const MessageReactiveList = reactive<Message[]>([]);

function createMessage(message: Message) {
    // @ts-ignore
    MessageReactiveList.push(message);
}

function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions<T>, options: MessageApiOptions<T> = {}, type: MessageType = 'text'): MessageApiInstance<T> {
    let apiOptions: MessageApiOptions<T>;

    if (maybeOptions) {
        if (typeof maybeOptions === 'string') {
            const reactiveOptions = reactive({
                message: maybeOptions,
                ...options
            });
            apiOptions = reactive(toRefs<MessageApiOptions<T>>(reactiveOptions));
            // watch(reactiveOptions, () => {
            //     console.log(reactiveOptions);
            // });
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
    // watch(apiOptions, () => {
    //     console.log(apiOptions);
    //     console.log(MessageReactiveList);
    // });
    return apiOptions;
}

const McMessage: MessageApi = (options: MessageOptions): MessageInstance => {
    const reactiveOptions = responsiveTarget(options);
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactivePick<MessageOptions, keyof MessageApiOptions<MessageType>>(reactiveOptions, 'message', 'className', 'closable', 'duration', 'style');
    createMessage({
        type,
        options: apiOptions
    });

    return reactiveOptions;
};
McMessage.text = (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => {
    return ApiConstructor<'text'>(maybeOptions, options, 'text');
};
McMessage.success = (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => {
    return ApiConstructor<'success'>(maybeOptions, options, 'success');
};
McMessage.warning = (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => {
    return ApiConstructor<'warning'>(maybeOptions, options, 'warning');
};
McMessage.info = (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => {
    return ApiConstructor<'info'>(maybeOptions, options, 'info');
};
McMessage.error = (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => {
    return ApiConstructor<'error'>(maybeOptions, options, 'error');
};
export default MessageReactiveList;
export { McMessage };
