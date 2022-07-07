import type { PropType, RenderFunction } from 'vue';
import type { UISize, UnionOmit } from '../_utils_';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--input-textarea-resizable'?: string;
        '--input-textarea-min-height'?: string;
        '--input-textarea-max-height'?: string;
        '--input-autosize-width'?: string;
        '--input-font-size'?: string;
        '--input-el-line-height'?: string;
        '--input-el-padding'?: string;
        '--input-wrapper-padding'?: string;
        '--input-padding'?: string;
        '--input-height'?: string;
        '--input-word-count-font-size'?: string;
        '--input-prefix-margin'?: string;
        '--input-suffix-margin'?: string;
        '--input-border-color'?: string;
        '--input-active-border-color'?: string;
        '--input-state-border-shadow-color'?: string;
    }
}

export interface InputSizeSet {
    fontSize: number;
    wordCountFontSize: string;
    padding: string;
    wrapperPaddingX: number;
    innerPaddingY: number;
    innerLineHeight: number;
    addonMargin: string;
}
export interface InputValidRule {
    message?: string;
    regExp?: RegExp;
    validator?: (value: string | string[], index?: number) => Error | boolean | void | Promise<Error | boolean | void>;
    trigger?: InputValidTrigger[];
    required?: boolean;
}
export type InputValidTrigger = 'input' | 'change' | 'focus' | 'blur' | 'clear' | 'select';
export type InputPlaceholder = string | (() => RenderFunction);
export type InputLimitType = 'trim' | 'number' | 'not-special' | 'not-space';
export type InputLimitRule = InputLimitType | RegExp | ((value: string, event: Event) => boolean);
export type InputSize = UnionOmit<UISize, 'mini'>;
export type InputSizeMap = Record<InputSize, InputSizeSet>;

export interface InputProps {
    value?: string | string[];
    type?: 'text' | 'password' | 'textarea';
    size?: InputSize;
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
    inputLimits?: InputLimitRule[];
    composed?: boolean;
    count?: number;
    separator?: string | string[];
    rules?: InputValidRule[];
}

export interface InputExposeInstance {
    focus: () => void;
    blur: () => void;
    select: () => void;
    setPasswordVisible: (visible: boolean) => void;
    resize: () => void;
    reset: () => void;
    validate(callback?: (isValid: boolean) => unknown): Promise<boolean>;
    validate(trigger?: InputValidTrigger, callback?: (isValid: boolean) => unknown): Promise<boolean>;
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
    size: {
        type: String as PropType<InputProps['size']>,
        default: 'medium'
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
    },
    rules: {
        type: Array as PropType<InputProps['rules']>,
        default: undefined
    }
};
