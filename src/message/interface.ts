import { VNode, CSSProperties, Ref, ref } from 'vue';

export type MessageCloseImpl = () => void;
export type MessageDestroyImpl = () => void;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error';

export interface MessageOptions {
    type: MessageType;
    className?: string | { [key: string]: boolean } | Array<string | { [key: string]: boolean }>;
    style?: CSSProperties;
    message?: string;
    closable?: boolean;
    duration?: number;
    onClose?: MessageCloseImpl;
}
export interface MessageInstance extends MessageOptions {
    close?: MessageCloseImpl;
}
export type MessageApiOptions<T extends MessageType> = Omit<MessageOptions, 'type'>;
export interface MessageApiInstance<T extends MessageType> extends MessageApiOptions<T> {
    close?: MessageCloseImpl;
}
export type MaybeMessageApiOptions<T extends MessageType> = string | MessageApiOptions<T>;
export type Message = {
    type: MessageType | Ref<MessageType>;
    options: MessageApiInstance<MessageType>;
};

export type MessageApi = {
    (options: MessageOptions): MessageInstance;
    text: (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => MessageApiInstance<'text'>;
    success: (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => MessageApiInstance<'success'>;
    warning: (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => MessageApiInstance<'warning'>;
    info: (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => MessageApiInstance<'info'>;
    error: (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => MessageApiInstance<'error'>;
};

export interface MessageExposeInstance {
    close: () => void;
}
