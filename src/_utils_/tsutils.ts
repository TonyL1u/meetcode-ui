import { VNode, RendererNode, RendererElement } from 'vue';
import * as CSS from 'csstype';

/**
 * Ts Utils
 */
export type Pick<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type Readonly<T> = {
    readonly [key in keyof T]: T[key];
};

export type UnionPick<T extends string | number | symbol, K extends T> = keyof Pick<Record<T, unknown>, K>;

export type UnionOmit<T extends string | number | symbol, K extends T> = keyof Omit<Record<T, unknown>, K>;

export type Key = string | number | symbol;

export type TypeOf<T, U> = T extends U ? true : false;

export type IsNumber<T> = TypeOf<T, number>;

export type IsString<T> = TypeOf<T, string>;

export type IsBoolean<T> = TypeOf<T, boolean>;

export type IsArray<T> = TypeOf<T, Array<unknown>>;

export type IsSymbol<T> = TypeOf<T, Symbol>;

export type IsNull<T> = TypeOf<T, null>;

export type IsUndefined<T> = TypeOf<T, undefined>;

export type IsObject<T> = TypeOf<T, object>;

export type CreateArray<L, E, A extends E[] = []> = A['length'] extends L ? A : CreateArray<L, E, [...A, E]>;

export type Add<X extends number, Y extends number> = [...CreateArray<X, 1>, ...CreateArray<Y, 1>]['length'];

/**
 * VNode Utils
 */
export type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

/**
 * UI Utils
 */
export type UIStatus = 'default' | 'hover' | 'active' | 'disabled';

export type UISize = 'mini' | 'small' | 'medium' | 'large';

export interface UIColorAttrs extends Record<string, string> {
    color: string;
    borderColor: string;
    backgroundColor: string;
}

export type ElementClassSet = string | Record<string, boolean> | ElementClassSet[];

/**
 * Jest Utils
 */
export type JestComputedStyle = CSSStyleDeclaration & Array<keyof (CSSStyleDeclaration & CSS.Properties)> & { _values: CSS.Properties; _importants: CSS.Properties };
