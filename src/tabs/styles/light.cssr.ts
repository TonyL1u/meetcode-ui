import { c } from '../../_utils_';

export default c([
    c('.mc-tabs', [
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
    c('.mc-tabs--card .mc-tabs-tab', [
        c(
            '&--active',
            {
                background: '#f2fcf8'
            },
            [
                c('&::before', {
                    background: '#10b981'
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
