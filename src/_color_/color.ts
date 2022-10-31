// import { createTonalPalette } from './createTonalPalette';
import { Hct, hexFromArgb, argbFromHex, TonalPalette, Blend } from '@material/material-color-utilities';

const TONE_ARR = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
const KEY_GREEN = '#2b8844';
const KEY_RED = '#e02f4b';
const KEY_BLUE = '#0078d9';
const KEY_ORANGE = '#fa913b';
const KEY_PINK = '#dc2c79';
const KEY_PURPLE = '#a144f8';
const KEY_GRAY = '#fffbfe';

export const createTonalPalette = (color: string) => {
    const argb = Blend.harmonize(argbFromHex(color), argbFromHex(KEY_GREEN));
    const { hue, chroma } = Hct.fromInt(argb);
    const palette = TonalPalette.fromHueAndChroma(hue, chroma);

    return TONE_ARR.map(tone => hexFromArgb(palette.tone(tone)));
    // .reverse()
    // .slice(0, -2);
};

const GREEN = createTonalPalette(KEY_GREEN);
const RED = createTonalPalette(KEY_RED);
const BLUE = createTonalPalette(KEY_BLUE);
const ORANGE = createTonalPalette(KEY_ORANGE);
const PINK = createTonalPalette(KEY_PINK);
const PURPLE = createTonalPalette(KEY_PURPLE);
const GRAY = createTonalPalette(KEY_GRAY);
const C1 = createTonalPalette('#625b71');
const C2 = createTonalPalette('#7d5260');

const PRIMARY = GREEN[5];
const NEUTRAL = GRAY[5];
const INFO = BLUE[5];
const SUCCESS = GREEN[5];
const DANGER = RED[5];
const WARNING = ORANGE[7];
const SECONDARY = C1[5];
const TERTIARY = C2[5];

export const ColorPalette = { GREEN, RED, ORANGE, BLUE, PURPLE, PINK, GRAY, C1, C2 };
export const ThemeColor = { PRIMARY, INFO, SUCCESS, WARNING, DANGER, NEUTRAL, SECONDARY, TERTIARY };
