import { VNode, CSSProperties } from 'vue';
import MessageInstance from './MessageInstance';

export type MessageCloseImpl = () => void;
export type MessageDestroyImpl = () => void;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error';

export interface MessageImpl {
    options: MessageApiOptions;
    VNode: VNode;
    wrapperEl: HTMLElement;
    close: MessageCloseImpl;
    destroy: MessageDestroyImpl;
}
export type Message<T> = { type: T } & MessageImpl;

export interface MessageInstanceOptions {
    type: MessageType;
    className?: string | { [key: string]: boolean } | Array<string | { [key: string]: boolean }>;
    style?: CSSProperties;
    message?: string;
    closable?: boolean;
    duration?: number;
}
export type MessageApiOptions = Omit<MessageInstanceOptions, 'type'>;
export type MaybeMessageApiOptions = string | MessageApiOptions;
export type MessageApi = {
    (options: MessageInstanceOptions): MessageInstance<MessageType>;
    text: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageInstance<'text'>;
    success: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageInstance<'success'>;
    warning: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageInstance<'warning'>;
    info: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageInstance<'info'>;
    error: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageInstance<'error'>;
};

export const MessageDefaultOptions: MessageApiOptions = {
    closable: false,
    duration: 3000
};
