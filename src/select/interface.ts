import type { PropType } from 'vue';
import type { PopselectOption } from '../popselect';

/** @public */
export type SelectOption = PopselectOption & {
    key?: string;
};

/** @public */
export interface SelectProps {
    /**
     * 选择器绑定的值
     * @designation (v-model)value
     * @defaultValue undefined
     */
    value?: string | number;
    /**
     * 选择器选项
     * @defaultValue undefined
     */
    options?: SelectOption[];
    /**
     * 是否开启过滤
     * @defaultValue false
     */
    filterable?: boolean;
    /**
     * 是否可清空
     * @defaultValue false
     */
    clearable?: boolean;
}

/** @internal */
export const _selectProps = {
    value: {
        type: [String, Number] as PropType<SelectProps['value']>,
        default: undefined
    },
    options: {
        type: Array as PropType<SelectProps['options']>,
        default: []
    },
    filterable: {
        type: Boolean as PropType<SelectProps['filterable']>,
        default: false
    },
    clearable: {
        type: Boolean as PropType<SelectProps['clearable']>,
        default: false
    }
};
