import type { PropType, RenderFunction } from 'vue';
import type { PopoverProps } from '../popover';
import type { ElementStyleSet } from '../_utils_';

/** @public */
export type PopselectValue = string | number | (string | number)[];
/** @public */
export interface PopselectOption {
    value: string | number;
    label: string | RenderFunction;
    disabled?: boolean;
}
/** @public */
export interface PopselectProps {
    /**
     * 弹出选择绑定的值
     * @designation (v-model)value
     * @defaultValue undefined
     */
    value?: PopselectValue;
    /**
     * 弹出选择选项
     * @defaultValue undefined
     */
    options?: PopselectOption[];
    /**
     * 是否多选
     * @defaultValue false
     */
    multiple?: boolean;
    /**
     * 弹出框的最大高度(px)
     * @defaultValue 300
     */
    maxHeight?: number;
    /**
     * 选择后自动关闭弹出框。单选默认开启，多选默认关闭
     * @defaultValue true
     */
    autoClose?: boolean;
    /**
     * 弹出框出现后自动定位到已选择项。多选默认滚动到第 1 个已选择项
     * @defaultValue true
     */
    autoScroll?: boolean;
    /**
     * 选项文本超度长度(px)是否截断省略
     * @defaultValue 200
     */
    truncate?: boolean | number;
    /**
     * 选项高度
     * @defaultValue 40
     */
    itemHeight?: number;
    /**
     * 选项样式
     * @defaultValue undefined
     */
    itemStyle?: ElementStyleSet;
    /**
     * 是否允许通过键盘上下键选择选项
     * @defaultValue true
     */
    useArrowControl?: boolean;
}

/** @internal */
export const _popselectProps = {
    value: {
        type: [String, Number, Array] as PropType<PopselectProps['value']>,
        default: undefined
    },
    options: {
        type: Array as PropType<PopselectProps['options']>,
        default: []
    },
    multiple: {
        type: Boolean as PropType<PopselectProps['multiple']>,
        default: false
    },
    maxHeight: {
        type: Number as PropType<PopselectProps['maxHeight']>,
        default: 300
    },
    autoClose: {
        type: Boolean as PropType<PopselectProps['autoClose']>,
        default: undefined
    },
    autoScroll: {
        type: Boolean as PropType<PopselectProps['autoScroll']>,
        default: true
    },
    truncate: {
        type: [Boolean, Number] as PropType<PopselectProps['truncate']>,
        default: 200
    },
    itemHeight: {
        type: Number as PropType<PopselectProps['itemHeight']>,
        default: 40
    },
    itemStyle: {
        type: [String, Object] as PropType<PopselectProps['itemStyle']>,
        default: undefined
    },
    useArrowControl: {
        type: Boolean as PropType<PopselectProps['useArrowControl']>,
        default: true
    }
};

/** @internal */
export const _popselectEmits = ['update:value', 'select', 'arrow-select'];
