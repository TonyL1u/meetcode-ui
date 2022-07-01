import { c } from '../_utils_';
import type { CNode } from 'css-render';

export type Components = 'Switch';
export type ComponentThemeVars = Record<string, string>;
export interface SwitchThemeVars extends ComponentThemeVars {
    checkedColor: string;
    checkedBackground: string;
    uncheckedColor: string;
    uncheckedBackground: string;
    handlerColor: string;
    handleBoxShadow: string;
    rippleColor: string;
}
export interface ThemeVars extends Record<Components, ComponentThemeVars> {
    Switch: SwitchThemeVars;
}

export const ColorSchemeTemplate = {
    Switch: (vars: SwitchThemeVars) => {
        const { checkedColor, checkedBackground, uncheckedBackground, handlerColor, handleBoxShadow, rippleColor } = vars;

        return c([
            c('.mc-switch', [
                c('&--checked .mc-switch-label-text--right, &:not(&--checked) .mc-switch-label-text--left', {
                    color: `var(--switch-checked-color, ${checkedColor})`
                }),
                c('&--checked > &-label', {
                    background: `var(--switch-checked-color, ${checkedBackground})`
                })
            ]),
            c(
                '.mc-switch-label',
                {
                    background: `var(--switch-unchecked-color, ${uncheckedBackground})`
                },
                [
                    c('&__content', {
                        color: '#fff'
                    }),
                    c('&__handler', {
                        background: `var(--switch-handler-color, ${handlerColor})`,
                        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)'
                    })
                ]
            )
        ]);
    }
} as Record<Components, (vars: ComponentThemeVars) => CNode>;
