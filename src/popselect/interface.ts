import { PropType, RenderFunction } from 'vue';

export type PopselectValue = string | number | Array<string | number>;
export interface PopselectOption {
    value: string | number;
    label: string | RenderFunction;
    disabled?: boolean;
}

export interface PopselectProps {
    value: PopselectValue;
    options: Array<PopselectOption>;
    multiple: boolean;
    maxHeight: number;
    autoClose?: boolean;
    autoScroll: boolean;
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
    }
};
