import type { UnionOmit, UIStatus, UIColorAttrs } from '../_utils_';

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
const hexAlphaMap: Record<string, string> = {
    '1.00': 'FF',
    '0.99': 'FC',
    '0.98': 'FA',
    '0.97': 'F7',
    '0.96': 'F5',
    '0.95': 'F2',
    '0.94': 'F0',
    '0.93': 'ED',
    '0.92': 'EB',
    '0.91': 'E8',
    '0.90': 'E6',
    '0.89': 'E3',
    '0.88': 'E0',
    '0.87': 'DE',
    '0.86': 'DB',
    '0.85': 'D9',
    '0.84': 'D6',
    '0.83': 'D4',
    '0.82': 'D1',
    '0.81': 'CF',
    '0.80': 'CC',
    '0.79': 'C9',
    '0.78': 'C7',
    '0.77': 'C4',
    '0.76': 'C2',
    '0.75': 'BF',
    '0.74': 'BD',
    '0.73': 'BA',
    '0.72': 'B8',
    '0.71': 'B5',
    '0.70': 'B3',
    '0.69': 'B0',
    '0.68': 'AD',
    '0.67': 'AB',
    '0.66': 'A8',
    '0.65': 'A6',
    '0.64': 'A3',
    '0.63': 'A1',
    '0.62': '9E',
    '0.61': '9C',
    '0.60': '99',
    '0.59': '96',
    '0.58': '94',
    '0.57': '91',
    '0.56': '8F',
    '0.55': '8C',
    '0.54': '8A',
    '0.53': '87',
    '0.52': '85',
    '0.51': '82',
    '0.50': '80',
    '0.49': '7D',
    '0.48': '7A',
    '0.47': '78',
    '0.46': '75',
    '0.45': '73',
    '0.44': '70',
    '0.43': '6E',
    '0.42': '6B',
    '0.41': '69',
    '0.40': '66',
    '0.39': '63',
    '0.38': '61',
    '0.37': '5E',
    '0.36': '5C',
    '0.35': '59',
    '0.34': '57',
    '0.33': '54',
    '0.32': '52',
    '0.31': '4F',
    '0.30': '4D',
    '0.29': '4A',
    '0.28': '47',
    '0.27': '45',
    '0.26': '42',
    '0.25': '40',
    '0.24': '3D',
    '0.23': '3B',
    '0.22': '38',
    '0.21': '36',
    '0.20': '33',
    '0.19': '30',
    '0.18': '2E',
    '0.17': '2B',
    '0.16': '29',
    '0.15': '26',
    '0.14': '24',
    '0.13': '21',
    '0.12': '1F',
    '0.11': '1C',
    '0.10': '1A',
    '0.09': '17',
    '0.08': '14',
    '0.07': '12',
    '0.06': '0F',
    '0.05': '0D',
    '0.04': '0A',
    '0.03': '08',
    '0.02': '05',
    '0.01': '03',
    '0.00': '00'
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

export function setColorAlpha(color: string, alpha: number = 1): string {
    let i;
    if ((i = hexRegex.exec(color))) {
        return stringifyHexa(i[1], i[2], i[3], hexAlphaMap[alpha.toFixed(2)]).toLowerCase();
    } else if ((i = rgbRegex.exec(color)) || (i = rgbaRegex.exec(color))) {
        return stringifyRgba(roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), alpha);
    } else {
        return color;
    }
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

export function stringifyHexa(r: string, g: string, b: string, a: string): string {
    return `#${r}${g}${b}${a}`;
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

export function createHoverColor(rgb: string, mix: number | RGBA = 0.16): string {
    return composite(rgb, typeof mix === 'number' ? [255, 255, 255, mix] : mix);
}

export function createActiveColor(rgb: string, mix: number | RGBA = 0.12): string {
    return composite(rgb, typeof mix === 'number' ? [0, 0, 0, mix] : mix);
}

export function createDisabledColor(rgb: string, mix: number | RGBA = 0.64): string {
    return composite(rgb, typeof mix === 'number' ? [255, 255, 255, mix] : mix);
}

export function useColorFactory<S extends Partial<UIColorAttrs>>(inputColor: S, customMix?: Partial<Record<UnionOmit<UIStatus, 'default'>, number | RGBA>>): Record<UIStatus, S> {
    const colorSet: Record<UIStatus, Partial<UIColorAttrs>> = {
        default: {},
        hover: {},
        active: {},
        disabled: {}
    };
    Object.keys(inputColor).forEach(attr => {
        colorSet.default[attr] = inputColor[attr];
        colorSet.hover[attr] = createHoverColor(inputColor[attr]!, customMix?.hover);
        colorSet.active[attr] = createActiveColor(inputColor[attr]!, customMix?.active);
        colorSet.disabled[attr] = createDisabledColor(inputColor[attr]!, customMix?.disabled);
    });

    return colorSet as Record<UIStatus, S>;
}
