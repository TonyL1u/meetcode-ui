import type { PropType, RenderFunction } from 'vue';
import type { PopoverProps } from '../popover';
import type { ElementStyleSet } from '../_utils_';

export type PopselectValue = string | number | (string | number)[];
export type PopselectMergedProps = PopselectProps & PopoverProps;
export interface PopselectOption {
    value: string | number;
    label: string | RenderFunction;
    disabled?: boolean;
}

export interface PopselectProps {
    value?: PopselectValue;
    options?: Array<PopselectOption>;
    multiple?: boolean;
    maxHeight?: number;
    autoClose?: boolean;
    autoScroll?: boolean;
    truncate?: boolean | number;
    itemHeight?: number;
    itemStyle?: ElementStyleSet;
}
export const popselectProps = {
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
    }
};

export const popselectEmits = ['update:value', 'select'];
