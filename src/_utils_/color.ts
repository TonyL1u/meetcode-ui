import { Key, UIStatus, UIColorAttrs } from './tsutils';

const baseColors: Record<string, string> = {
    black: '#000',
    silver: '#C0C0C0',
    gray: '#808080',
    white: '#FFF',
    maroon: '#800000',
    red: '#F00',
    purple: '#800080',
    fuchsia: '#F0F',
    green: '#008000',
    lime: '#0F0',
    olive: '#808000',
    yellow: '#FF0',
    navy: '#000080',
    blue: '#00F',
    teal: '#008080',
    aqua: '#0FF',
    transparent: '#0000',
    pink: '#ffc0cb'
};
const prefix = '^\\s*';
const suffix = '\\s*$';
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'; // 4 offset
const hex = '([0-9A-Fa-f])';
const dhex = '([0-9A-Fa-f]{2})';
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
const parseHex = (value: string) => parseInt(value, 16);

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type HSLA = [number, number, number, number];
export type HSVA = [number, number, number, number];
export type HSL = [number, number, number];
export type HSV = [number, number, number];
interface ColorFactoryConfig<E extends string, P extends Key> {
    color: string;
    borderColor: string;
    backgroundColor: string;

    colorSet?: Partial<Record<E, string>>;
    borderColorSet?: Partial<Record<E, string>>;
    backgroundColorSet?: Partial<Record<E, string>>;

    attrs?: P | P[];
}
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [h, s, v] 360, 100, 100
 */
export function hsl2hsv(h: number, s: number, l: number): HSV {
    s /= 100;
    l /= 100;
    const v = s * Math.min(l, 1 - l) + l;
    return [h, v ? (2 - (2 * l) / v) * 100 : 0, v * 100];
}
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [h, s, l] 360, 100, 100
 */
export function hsv2hsl(h: number, s: number, v: number): HSL {
    s /= 100;
    v /= 100;
    const l = v - (v * s) / 2;
    const m = Math.min(l, 1 - l);
    return [h, m ? ((v - l) / m) * 100 : 0, l * 100];
}
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [r, g, b] 255, 255, 255
 */
export function hsv2rgb(h: number, s: number, v: number): RGB {
    s /= 100;
    v /= 100;
    let f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5) * 255, f(3) * 255, f(1) * 255];
}
/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
export function rgb2hsv(r: number, g: number, b: number): HSV {
    r /= 255;
    g /= 255;
    b /= 255;
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), v && (c / v) * 100, v * 100];
}

/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
export function rgb2hsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b),
        f = 1 - Math.abs(v + v - c - 1);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), f ? (c / f) * 100 : 0, (v + v - c) * 50];
}
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [255, 255, 255]
 */
export function hsl2rgb(h: number, s: number, l: number): RGB {
    s /= 100;
    l /= 100;
    let a = s * Math.min(l, 1 - l);
    let f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0) * 255, f(8) * 255, f(4) * 255];
}

export function rgba(color: string): RGBA {
    try {
        let i;
        if ((i = hexRegex.exec(color))) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
        } else if ((i = rgbRegex.exec(color))) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
        } else if ((i = rgbaRegex.exec(color))) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), roundAlpha(i[13])];
        } else if ((i = sHexRegex.exec(color))) {
            return [parseHex(i[1] + i[1]), parseHex(i[2] + i[2]), parseHex(i[3] + i[3]), 1];
        } else if ((i = hexaRegex.exec(color))) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), roundAlpha(parseHex(i[4]) / 255)];
        } else if ((i = sHexaRegex.exec(color))) {
            return [parseHex(i[1] + i[1]), parseHex(i[2] + i[2]), parseHex(i[3] + i[3]), roundAlpha(parseHex(i[4] + i[4]) / 255)];
        } else if (Object.keys(baseColors).includes(color)) {
            return rgba(baseColors[color]);
        }
        throw new Error(`Invalid color value ${color}.`);
    } catch (e) {
        throw e;
    }
}

export function roundChannel(value: number | string): number {
    const v = Math.round(Number(value));
    if (v > 255) return 255;
    if (v < 0) return 0;
    return v;
}

export function normalizeAlpha(alphaValue: number): number {
    return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}

export function roundAlpha(value: number | string): number {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1) return 1;
    if (v < 0) return 0;
    return v;
}

export function stringifyRgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}

export function compositeChannel(v1: number, a1: number, v2: number, a2: number, a: number): number {
    return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}

export function composite(background: string | RGB | RGBA, overlay: string | RGB | RGBA): string {
    if (!Array.isArray(background)) background = rgba(background);
    if (!Array.isArray(overlay)) overlay = rgba(overlay);
    const a1 = background[3]!;
    const a2 = overlay[3]!;
    const alpha = roundAlpha(a1 + a2 - a1 * a2);
    return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}

export function createHoverColor(rgb: string): string {
    return composite(rgb, [255, 255, 255, 0.16]);
}

export function createActiveColor(rgb: string): string {
    return composite(rgb, [0, 0, 0, 0.12]);
}

export function createDisabledColor(rgb: string): string {
    return composite(rgb, [255, 255, 255, 0.64]);
}

export function useColorFactory<S extends UIColorAttrs>(colorFactoryConfig: ColorFactoryConfig<UIStatus, keyof S>): Record<UIStatus, S> {
    const { color, borderColor, backgroundColor, colorSet, borderColorSet, backgroundColorSet, attrs } = colorFactoryConfig;
    const { default: defaultColor = color, hover: hoverColor = createHoverColor(color), active: activeColor = createActiveColor(color), disabled: disabledColor = createDisabledColor(color) } = colorSet ?? {};
    const {
        default: defaultBorderColor = borderColor,
        hover: hoverBorderColor = createHoverColor(borderColor),
        active: activeBorderColor = createActiveColor(borderColor),
        disabled: disabledBorderColor = createDisabledColor(borderColor)
    } = borderColorSet ?? {};
    const {
        default: defaultBackgroundColor = backgroundColor,
        hover: hoverBackgroundColor = createHoverColor(backgroundColor),
        active: activeBackgroundColor = createActiveColor(backgroundColor),
        disabled: disabledBackgroundColor = createDisabledColor(backgroundColor)
    } = backgroundColorSet ?? {};

    return {
        default: { color: defaultColor, borderColor: defaultBorderColor, backgroundColor: defaultBackgroundColor } as S,
        hover: { color: hoverColor, borderColor: hoverBorderColor, backgroundColor: hoverBackgroundColor } as S,
        active: { color: activeColor, borderColor: activeBorderColor, backgroundColor: activeBackgroundColor } as S,
        disabled: { color: disabledColor, borderColor: disabledBorderColor, backgroundColor: disabledBackgroundColor } as S
    };
}
