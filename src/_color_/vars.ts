import { c } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { ThemeColor, ColorPalette } from './color';

const { PRIMARY, INFO, SUCCESS, DANGER, WARNING } = ThemeColor;
const { GREEN } = ColorPalette;
const RootVars = c(':root', {
    // main color
    '--mc-primary-color': PRIMARY,
    '--mc-info-color': INFO,
    '--mc-success-color': SUCCESS,
    '--mc-danger-color': DANGER,
    '--mc-warning-color': WARNING,

    // tone color
    '--mc-primary-color-5': GREEN[0],
    '--mc-primary-color-10': GREEN[1],
    '--mc-primary-color-20': GREEN[2],
    '--mc-primary-color-30': GREEN[3],
    '--mc-primary-color-40': GREEN[4],
    '--mc-primary-color-50': GREEN[5],
    '--mc-primary-color-60': GREEN[6],
    '--mc-primary-color-70': GREEN[7],
    '--mc-primary-color-80': GREEN[8],
    '--mc-primary-color-90': GREEN[9],
    '--mc-primary-color-95': GREEN[10],
    '--mc-primary-color-99': GREEN[11],
    '--mc-primary-color-100': GREEN[12]
});

useThemeRegister({
    key: 'RootVars',
    main: RootVars
});
