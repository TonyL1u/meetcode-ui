export type Pick<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type Readonly<T> = {
    readonly [key in keyof T]: T[key];
};
