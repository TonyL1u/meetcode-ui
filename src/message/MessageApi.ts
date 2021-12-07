import { reactive, toRef, watch, ref, toRefs } from 'vue';
import { reactiveOmit, responsiveTarget } from '../_utils_';
import { MessageApi, MessageOptions, MessageApiOptions, MaybeMessageApiOptions, MessageInstance } from './interface';
import { createMessage, ApiConstructor } from './MessageComposable';

const McMessage: MessageApi = (options: MessageOptions): MessageInstance => {
    const reactiveOptions = responsiveTarget(options);
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactiveOmit<MessageOptions, 'type'>(reactiveOptions, 'type');
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

export default McMessage;
