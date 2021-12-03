import { VNodeChild, Ref } from 'vue';

export type MessageCloseImpl = () => void;
export type MessageDestroyImpl = () => void;

export interface MessageInstanceImpl {
    type: Ref<'success' | 'warning' | 'info' | 'error'>;
    content: Ref<string>;
    close: MessageCloseImpl;
    destroy: MessageDestroyImpl;
}

export interface MessageApiOptions {
    content?: string;
}
