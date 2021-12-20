export type PopselectValue = string | number | Array<string | number>;
export interface PopselectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
