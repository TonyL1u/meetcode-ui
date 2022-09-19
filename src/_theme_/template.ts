import { c } from '../_utils_';
import type { CNode } from 'css-render';

export type Components = 'Switch' | 'Tabs';
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
export interface TabsThemeVars extends ComponentThemeVars {
    activeColor: string;
}
export interface ThemeVars extends Partial<Record<Components, ComponentThemeVars>> {
    Switch?: SwitchThemeVars;
    Tabs?: TabsThemeVars;
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
    },
    Tabs: (vars: TabsThemeVars) => {
        const { activeColor } = vars;
        return c([
            c('.mc-tabs', [
                c('&-tab', [
                    c('&:hover', {
                        color: `var(--tab-active-color, ${activeColor})`
                    })
                ]),
                c('&-tab--active', {
                    color: `var(--tab-active-color, ${activeColor})`
                }),
                c(
                    '&-tab--disabled',
                    {
                        color: '#bbb'
                    },
                    [
                        c('&:hover', {
                            color: '#bbb'
                        })
                    ]
                )
            ]),
            c('.mc-tabs__header', [
                c('&--with-line', [
                    c('.mc-tabs__header-scroll-content', {
                        borderBottom: '1px solid #e4e7ed'
                    }),
                    c('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                        borderBottom: '1px solid #e4e7ed'
                    }),
                    c('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                        borderTop: '1px solid #e4e7ed'
                    })
                ])
            ]),
            c('.mc-tabs--bar .mc-tabs__header', [
                c('&--bar-scale .mc-tabs-tab', [
                    c('&::after', {
                        background: `var(--tab-active-color, ${activeColor})`
                    })
                ]),
                c('&-bar', {
                    background: `var(--tab-active-color, ${activeColor})`
                })
            ]),
            c('.mc-tabs--card .mc-tabs-tab', [
                c(
                    '&--active',
                    {
                        background: '#f2fcf8'
                    },
                    [
                        c('&::before', {
                            background: `${activeColor || '#10b981'}`
                        }),
                        c('&::after', {
                            background: 'inherit'
                        })
                    ]
                )
            ]),
            c('.mc-tabs--segment', [
                c(
                    '.mc-tabs__header',
                    {
                        background: '#f6f6f9'
                    },
                    [
                        c('&-bar', {
                            background: '#fff'
                        }),
                        c('&--bar-fade .mc-tabs-tab', [
                            c('&--active', {
                                background: '#fff'
                            })
                        ])
                    ]
                )
            ])
        ]);
    }
} as Record<Components, (vars: ComponentThemeVars) => CNode>;
