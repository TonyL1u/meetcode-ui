// export { default as McMessage } from './Message.vue';
import { render } from 'vue';
import { MessageType, MessageInstanceOptions, MessageApiOptions, MessageDefaultOptions, MessageApi, MaybeMessageApiOptions } from './interface';
import MessageInstance from './MessageInstance';
import './style.scss';

const MessageInstanceList: MessageInstance<MessageType>[] = [];
const container = document.createElement('div');
container.className = 'mc-message-global-container';
document.body.appendChild(container);

function create<T extends MessageType>(options: MessageApiOptions, type: T) {
    const instance = new MessageInstance<T>(options, type);
    const { VNode, wrapperEl } = instance;
    render(VNode, wrapperEl);
    container.appendChild(wrapperEl);

    MessageInstanceList.push(instance);
    return instance;
}

function ApiConstructor<T extends MessageType>(maybeOptions?: MaybeMessageApiOptions, options: MessageApiOptions = MessageDefaultOptions, type?: T): MessageInstance<T> {
    if (maybeOptions) {
        if (typeof maybeOptions === 'string') {
            return create<T>({ message: maybeOptions, ...options }, type!);
        } else {
            return create<T>(maybeOptions, type!);
        }
    }
    return create<T>(options, type!);
}

const McMessage: MessageApi = (options: MessageInstanceOptions): MessageInstance<MessageType> => {
    return create<MessageType>(options, options.type!);
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
export { McMessage };
export type { MessageApiOptions } from './interface';
