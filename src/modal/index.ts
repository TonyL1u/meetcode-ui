// import './style.scss';
import lightCssr from './styles/light.cssr';
import darkCssr from './styles/dark.cssr';
import { useLightTheme, useDarkTheme } from '../theme';
export { default as McModal } from './Modal';
export type { ModalCloseAction } from './interface';

useLightTheme('McModal', lightCssr);
useDarkTheme('McModal', darkCssr);
