import { c } from '../../_utils_';

export default c([
    c(
        '.mc-tabs',
        {
            color: '#eee'
        },
        [
            c('&-tab', [
                c('&:hover', {
                    color: 'var(--tab-active-color, #63e2b7)'
                })
            ]),
            c('&-tab--active', {
                color: 'var(--tab-active-color, #63e2b7)'
            }),
            c(
                '&-tab--disabled',
                {
                    color: '#7a7d85'
                },
                [
                    c('&:hover', {
                        color: '#7a7d85'
                    })
                ]
            )
        ]
    ),
    c('.mc-tabs__header', [
        c('&--with-line', [
            c('.mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #7a7d85'
            }),
            c('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #7a7d85'
            }),
            c('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                borderTop: '1px solid #7a7d85'
            })
        ])
    ]),
    c('.mc-tabs--bar .mc-tabs__header', [
        c('&--bar-scale .mc-tabs-tab', [
            c('&::after', {
                background: 'var(--tab-active-color, #63e2b7)'
            })
        ]),
        c('&-bar', {
            background: 'var(--tab-active-color, #63e2b7)'
        })
    ]),
    c('.mc-tabs--card .mc-tabs-tab', [
        c(
            '&--active',
            {
                background: '#1f2430'
            },
            [
                c('&::before', {
                    background: '#63e2b7'
                }),
                c('&::after', {
                    background: '#1f2430'
                })
            ]
        )
    ]),
    c('.mc-tabs--segment', [
        c(
            '.mc-tabs__header',
            {
                background: '#313540'
            },
            [
                c('&-bar', {
                    background: '#1f2430'
                }),
                c('&--bar-fade .mc-tabs-tab', [
                    c('&--active', {
                        background: '#1f2430'
                    })
                ])
            ]
        )
    ])
]);
