import type { PropType, RenderFunction } from 'vue';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--input-textarea-resizable'?: string;
        '--input-textarea-min-height'?: string;
        '--input-textarea-max-height'?: string;
        '--input-autosize-width'?: string;
    }
}

export type InputLimitType = 'trim' | 'number' | 'not-special' | 'not-space';
export type InputPlaceholder = string | (() => RenderFunction);
export interface InputProps {
    value?: string | string[];
    type?: 'text' | 'password' | 'textarea';
    placeholder?: InputPlaceholder | InputPlaceholder[];
    disabled?: boolean;
    focusOnTyping?: boolean;
    autosize?: boolean;
    resizable?: boolean;
    clearable?: boolean;
    wordCount?: boolean;
    loading?: boolean;
    passwordVisible?: 'none' | 'click' | 'hover' | 'mousedown';
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    inputLimits?: (InputLimitType | RegExp | ((value: string, event: Event) => boolean))[];
    composed?: boolean;
    count?: number;
    separator?: string | string[];
}

export interface InputExposeInstance {
    focus: () => void;
    blur: () => void;
    select: () => void;
    setPasswordVisible: (visible: boolean) => void;
}

export const enum InputEventType {
    INSERT = 'insertText',
    DELETE = 'deleteContentBackward',
    PASTE = 'insertFromPaste',
    INSERT_COMPOSITION = 'insertCompositionText'
}

export const inputProps = {
    value: {
        type: [String, Array] as PropType<InputProps['value']>,
        default: undefined
    },
    type: {
        type: String as PropType<InputProps['type']>,
        default: 'text'
    },
    placeholder: {
        type: [String, Function, Array] as PropType<InputProps['placeholder']>,
        default: '请输入'
    },
    disabled: {
        type: Boolean as PropType<InputProps['disabled']>,
        default: false
    },
    focusOnTyping: {
        type: Boolean as PropType<InputProps['focusOnTyping']>,
        default: false
    },
    resizable: {
        type: Boolean as PropType<InputProps['resizable']>,
        default: true
    },
    clearable: {
        type: Boolean as PropType<InputProps['clearable']>,
        default: false
    },
    autosize: {
        type: Boolean as PropType<InputProps['autosize']>,
        default: false
    },
    wordCount: {
        type: Boolean as PropType<InputProps['wordCount']>,
        default: false
    },
    loading: {
        type: Boolean as PropType<InputProps['loading']>,
        default: false
    },
    passwordVisible: {
        type: String as PropType<InputProps['passwordVisible']>,
        default: 'click'
    },
    minRows: {
        type: Number as PropType<InputProps['minRows']>,
        default: undefined
    },
    maxRows: {
        type: Number as PropType<InputProps['maxRows']>,
        default: undefined
    },
    maxLength: {
        type: Number as PropType<InputProps['maxLength']>,
        default: undefined
    },
    inputLimits: {
        type: Array as PropType<InputProps['inputLimits']>,
        default: undefined
    },
    composed: {
        type: Boolean as PropType<InputProps['composed']>,
        default: false
    },
    inputCount: {
        type: Number as PropType<InputProps['count']>,
        default: 2
    },
    separator: {
        type: [String, Array] as PropType<InputProps['separator']>,
        default: undefined
    }
};
