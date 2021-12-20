import { VNodeChild } from 'vue';

export type PopselectValue = string | number | Array<string | number>;
export interface PopselectOption {
    value: string | number;
    label: string | (() => VNodeChild);
    disabled?: boolean;
}
