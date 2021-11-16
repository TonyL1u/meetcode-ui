export type PopselectValue = string | number | Array<string | number>;
export interface PopselectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
