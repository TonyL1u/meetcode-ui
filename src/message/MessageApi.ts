import { reactive, toRef, watch, ref, toRefs, nextTick } from 'vue';
import { reactiveOmit, responsiveTarget } from '../_utils_';
import { MessageApi, MessageOptions, MessageApiOptions, MessageApiInstance, MaybeMessageApiOptions, MessageInstance, MessageType } from './interface';
import { createMessage, ApiConstructor } from './MessageComposable';

const McMessage: MessageApi = (options: MessageOptions): MessageInstance => {
    const reactiveOptions = responsiveTarget(options) as MessageInstance;
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactiveOmit<MessageOptions, 'type'>(reactiveOptions, 'type') as MessageApiInstance<MessageType>;
    createMessage({
        type,
        options: apiOptions
    });

    // hack-in close and el
    // nextTick(() => {
    //     reactiveOptions.close = apiOptions.close;
    //     reactiveOptions.el = apiOptions.el;
    // });

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

export default McMessage;
