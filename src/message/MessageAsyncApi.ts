import { reactive, toRef, watch, ref, toRefs, nextTick } from 'vue';
import { reactiveOmit, responsiveTarget } from '../_utils_';
import { MessageAsyncApi, MessageOptions, MessageApiOptions, MessageApiInstance, MaybeMessageApiOptions, MessageInstance, MessageType } from './interface';
import { createMessage, ApiConstructor } from './MessageComposable';

const McAsyncMessage: MessageAsyncApi = (options: MessageOptions): Promise<MessageInstance> => {
    const reactiveOptions = responsiveTarget(options) as MessageInstance;
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactiveOmit<MessageOptions, 'type'>(reactiveOptions, 'type') as MessageApiInstance<MessageType>;
    createMessage({
        type,
        options: apiOptions
    });

    // hack-in close and el
    nextTick(() => {
        reactiveOptions.close = apiOptions.close;
        reactiveOptions.el = apiOptions.el;
    });

    return new Promise<MessageInstance>(resolve => {
        const originalOnCloseHandler = apiOptions.onClose;
        apiOptions.onClose = () => {
            originalOnCloseHandler && originalOnCloseHandler();
            resolve(reactiveOptions);
        };
    });
};
McAsyncMessage.text = (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => {
    return ApiConstructor<'text'>(maybeOptions, options, 'text', true);
};
McAsyncMessage.success = (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => {
    return ApiConstructor<'success'>(maybeOptions, options, 'success', true);
};
McAsyncMessage.warning = (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => {
    return ApiConstructor<'warning'>(maybeOptions, options, 'warning', true);
};
McAsyncMessage.info = (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => {
    return ApiConstructor<'info'>(maybeOptions, options, 'info', true);
};
McAsyncMessage.error = (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => {
    return ApiConstructor<'error'>(maybeOptions, options, 'error', true);
};

export default McAsyncMessage;
