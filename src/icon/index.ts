import lightCssr from './styles/light.cssr';
import { useLightTheme, useDarkTheme } from '../theme';
export { default as McIcon } from './Icon';

useLightTheme('McIcon', lightCssr);
useDarkTheme('McIcon', lightCssr);
