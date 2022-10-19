import type { VNodeChild, CSSProperties, PropType } from 'vue';

export type MessageCloseImpl = () => void | Promise<void>;
export type MessageType = 'text' | 'success' | 'warning' | 'info' | 'error' | 'loading';
export interface MessageOptions {
    type: MessageType;
    message?: string | (() => VNodeChild);
    className?: string;
    style?: string | CSSProperties;
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
export type MessageApiOptions = Partial<Omit<MessageOptions, 'type'>>;
export type Message = {
    readonly key: string;
    type: MessageType;
    options: MessageApiOptions;
};
export type ConfigurableMessage = Required<MessageOptions> & Readonly<MessageExposeInstance>;
export type MessageApiReturnType<S extends boolean> = S extends true ? Promise<ConfigurableMessage> : ConfigurableMessage;
export type CreateMessageApiReturnType<S extends boolean> = {
    (options: MessageApiOptions): MessageApiReturnType<S>;
    (content: string): MessageApiReturnType<S>;
    (content: string, options: MessageApiOptions): MessageApiReturnType<S>;
};

export type MessageApi<S extends boolean = false> = {
    (options: MessageOptions): MessageApiReturnType<S>;
    text: CreateMessageApiReturnType<S>;
    success: CreateMessageApiReturnType<S>;
    warning: CreateMessageApiReturnType<S>;
    info: CreateMessageApiReturnType<S>;
    error: CreateMessageApiReturnType<S>;
    loading: CreateMessageApiReturnType<S>;
};

export interface MessageExposeInstance {
    close?: MessageCloseImpl;
    el?: HTMLElement;
}

export type MessagePlacement = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface MessageGlobalConfig {
    max?: number;
    placement?: MessagePlacement;
    duration?: number;
    itemGap?: number;
    card?: boolean;
    hoverAlive?: boolean;
    closable?: boolean;
    containerStyle?: string | CSSProperties;
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
