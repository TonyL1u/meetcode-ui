import { c } from '../../_utils_';

export default c([
    c(
        '.mc-tabs',
        {
            color: '#eee'
        },
        [
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
    c('.mc-tabs--card .mc-tabs-tab', [
        c(
            '&--active',
            {
                background: '#1f2430'
            },
            [
                c('&::before', {
                    background: '#10b981'
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
