import { VNodeChild, CSSProperties, Ref } from 'vue';

export type MessageCloseImpl = () => void | Promise<void>;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error';

export interface MessageOptions {
    type?: MessageType;
    className?: string;
    style?: string | CSSProperties;
    message?: string | (() => VNodeChild);
    duration?: number;
    closable?: boolean;
    hoverAlive?: boolean;
    html?: string;
    card?: boolean;
    icon?: () => VNodeChild;
    action?: () => VNodeChild;
    onClose?: MessageCloseImpl;
}
export type MessageApiOptions<T extends MessageType> = Omit<MessageOptions, 'type'>;

export type MessageInstance = MessageExposeInstance & MessageOptions;
export type MessageApiInstance<T extends MessageType> = MessageExposeInstance & MessageApiOptions<T>;

export type MaybeMessageApiOptions<T extends MessageType> = string | MessageApiOptions<T>;
export type Message = {
    readonly key: string;
    type: MessageType | Ref<MessageType | undefined>;
    options: Partial<MessageApiInstance<MessageType>>;
};
export type MessageApi = {
    (options: MessageOptions): MessageInstance;
    text: (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => MessageApiInstance<'text'>;
    success: (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => MessageApiInstance<'success'>;
    warning: (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => MessageApiInstance<'warning'>;
    info: (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => MessageApiInstance<'info'>;
    error: (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => MessageApiInstance<'error'>;
};

export type MessageAsyncApi = {
    (options: MessageOptions): Promise<MessageInstance>;
    text: (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => Promise<MessageApiInstance<'text'>>;
    success: (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => Promise<MessageApiInstance<'success'>>;
    warning: (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => Promise<MessageApiInstance<'warning'>>;
    info: (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => Promise<MessageApiInstance<'info'>>;
    error: (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => Promise<MessageApiInstance<'error'>>;
};

export interface MessageExposeInstance {
    close: MessageCloseImpl;
    el: HTMLElement;
}
