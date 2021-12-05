import { VNode, CSSProperties, Ref, ref } from 'vue';
import MessageInstance from './MessageInstance';

export type MessageCloseImpl = () => void;
export type MessageDestroyImpl = () => void;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error';

export interface MessageInstanceOptions {
    type: MessageType;
    className?: string | { [key: string]: boolean } | Array<string | { [key: string]: boolean }>;
    style?: CSSProperties;
    message?: string;
    closable?: boolean;
    duration?: number;
}
export type MessageApiOptions<T extends MessageType = 'text'> = Omit<MessageInstanceOptions, 'type'>;
export type MaybeMessageApiOptions = string | MessageApiOptions;
export type Message = {
    type: MessageType | Ref<MessageType>;
    options: MessageApiOptions;
};

export type MessageApi = {
    (options: MessageInstanceOptions): MessageInstanceOptions;
    text: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageApiOptions<'text'>;
    success: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageApiOptions<'success'>;
    warning: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageApiOptions<'warning'>;
    info: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageApiOptions<'info'>;
    error: (maybeOptions?: MaybeMessageApiOptions, options?: MessageApiOptions) => MessageApiOptions<'error'>;
};

export const MessageGlobalContainer: HTMLDivElement = document.createElement('div');
MessageGlobalContainer.className = 'mc-message-global-container';
