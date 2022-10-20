import type { PropType, RenderFunction, InjectionKey, Ref } from 'vue';
import type { UISize, UnionOmit } from '../_utils_';

export interface InputGroupInjection {
    validStatus: Ref<boolean>;
    updateValidStatus: (status: boolean) => void;
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
export const inputGroupInjectionKey: InjectionKey<InputGroupInjection> = Symbol();
export const inputIKey = Symbol('input');
export type InputValidTrigger = 'input' | 'change' | 'focus' | 'blur' | 'clear' | 'select';
export type InputPlaceholder = string | (() => RenderFunction);
export type InputLimitType = 'trim' | 'number' | 'not-special' | 'not-space';
export type InputLimitRule = InputLimitType | RegExp | ((value: string, event: Event) => boolean);
export type InputSize = UnionOmit<UISize, 'mini'>;
export type InputSizeMap = Record<InputSize, InputSizeSet>;

export interface InputProps {
    /**
     * 选择器绑定的值
     * @designation (v-model)value
     * @defaultValue undefined
     */
    value?: string | string[];
    /**
     * 输入框类型
     * @defaultValue 'text'
     */
    type?: 'text' | 'password' | 'textarea';
    /**
     * 输入框尺寸
     * @defaultValue 'medium'
     */
    size?: InputSize;
    /**
     * 占位符
     * @defaultValue undefined
     */
    placeholder?: InputPlaceholder | InputPlaceholder[];
    /**
     * 是否禁用
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * 是否在输入时自动聚焦
     * @defaultValue false
     */
    focusOnTyping?: boolean;
    /**
     * 自适应大小
     * @defaultValue false
     */
    autosize?: boolean;
    /**
     * `type = textarea` 时，是否允许手动调整大小
     * @defaultValue false
     */
    resizable?: boolean;
    /**
     * 是否可清空
     * @defaultValue false
     */
    clearable?: boolean;
    /**
     * 开启字数统计
     * @defaultValue false
     */
    wordCount?: boolean;
    /**
     * 开启加载中状态
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * `type = password` 时，切换密码显示的方式
     * @defaultValue 'click'
     */
    passwordVisible?: 'none' | 'click' | 'hover' | 'mousedown';
    /**
     * 文本域的最小行数
     * @defaultValue undefined
     */
    minRows?: number;
    /**
     * 文本域的最大行数
     * @defaultValue undefined
     */
    maxRows?: number;
    /**
     * 最大字数限制
     * @defaultValue undefined
     */
    maxLength?: number;
    /**
     * 进行输入限制时的规则
     * @defaultValue undefined
     */
    inputLimits?: InputLimitRule[];
    /**
     * 是否使用组合输入框
     * @defaultValue false
     */
    composed?: boolean;
    /**
     * 组合输入框个数
     * @defaultValue 2
     */
    count?: number;
    /**
     * 组合输入框的分隔符
     * @defaultValue undefined
     */
    separator?: string | string[];
    /**
     * 验证规则
     * @defaultValue undefined
     */
    rules?: InputValidRule[];
    /**
     * 隐藏边框
     * @defaultValue false
     */
    borderless?: boolean;
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
    },
    borderless: {
        type: Boolean as PropType<InputProps['borderless']>,
        default: false
    }
};
