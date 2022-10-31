import { c } from '../../_utils_';

export default c([
    c('.mc-tabs', [
        c('&-tab', [
            c('&:hover', {
                color: 'var(--tab-active-color, var(--mc-primary-color))'
            })
        ]),
        c('&-tab--active', {
            color: 'var(--tab-active-color, var(--mc-primary-color))'
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
                background: 'var(--tab-active-color, var(--mc-primary-color))'
            })
        ]),
        c('&-bar', {
            background: 'var(--tab-active-color, var(--mc-primary-color))'
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
                    background: 'var(--mc-primary-color)'
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
