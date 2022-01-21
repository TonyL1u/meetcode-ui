import { VNodeChild, CSSProperties, Ref, PropType } from 'vue';

export type MessageCloseImpl = () => void | Promise<void>;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error' | 'loading';
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
    itemGap?: number;
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
    loading: (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => MessageApiInstance<'loading'>;
};

export type MessageAsyncApi = {
    (options: MessageOptions): Promise<MessageInstance>;
    text: (maybeOptions?: MaybeMessageApiOptions<'text'>, options?: MessageApiOptions<'text'>) => Promise<MessageApiInstance<'text'>>;
    success: (maybeOptions?: MaybeMessageApiOptions<'success'>, options?: MessageApiOptions<'success'>) => Promise<MessageApiInstance<'success'>>;
    warning: (maybeOptions?: MaybeMessageApiOptions<'warning'>, options?: MessageApiOptions<'warning'>) => Promise<MessageApiInstance<'warning'>>;
    info: (maybeOptions?: MaybeMessageApiOptions<'info'>, options?: MessageApiOptions<'info'>) => Promise<MessageApiInstance<'info'>>;
    error: (maybeOptions?: MaybeMessageApiOptions<'error'>, options?: MessageApiOptions<'error'>) => Promise<MessageApiInstance<'error'>>;
    loading: (maybeOptions?: MaybeMessageApiOptions<'loading'>, options?: MessageApiOptions<'loading'>) => Promise<MessageApiInstance<'loading'>>;
};

export interface MessageExposeInstance {
    close: MessageCloseImpl;
    el: HTMLElement;
}

export interface MessageProps {
    type?: MessageType;
    duration?: number;
    closable?: boolean;
    hoverAlive?: boolean;
    html?: string;
    card?: boolean;
    icon?: () => VNodeChild;
    action?: () => VNodeChild;
}

export const messageProps = {
    type: {
        type: String as PropType<MessageProps['type']>,
        default: 'text'
    },
    duration: {
        type: Number as PropType<MessageProps['duration']>,
        default: 3000
    },
    closable: {
        type: Boolean as PropType<MessageProps['closable']>,
        default: false
    },
    hoverAlive: {
        type: Boolean as PropType<MessageProps['hoverAlive']>,
        default: true
    },
    html: {
        type: String as PropType<MessageProps['type']>,
        default: undefined
    },
    card: {
        type: Boolean as PropType<MessageProps['card']>,
        default: false
    },
    icon: {
        type: Function as PropType<MessageProps['icon']>,
        default: undefined
    },
    action: {
        type: Function as PropType<MessageProps['action']>,
        default: undefined
    }
};
