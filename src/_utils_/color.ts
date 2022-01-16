const colors: Record<string, string> = {
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
    transparent: '#0000'
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
        } else if (Object.keys(colors).includes(color)) {
            return rgba(colors[color]);
        }
        throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
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
