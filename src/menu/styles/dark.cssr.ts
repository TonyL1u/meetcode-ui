import { c } from '../../_utils_';

export default c([
    c('.mc-menu:not(.mc-menu--horizontal), .mc-sub-menu--dropdown, .mc-menu-item-group--dropdown', [
        c('.mc-menu-item', [
            c('&:hover::before', {
                background: '#1f2430'
            }),
            c('&--active::before', {
                background: '#1f2430'
            }),
            c('&--active', {
                color: '#63e2b7'
            })
        ]),
        c('.mc-menu-item-group', [
            c('&--child-active > .mc-menu-item-group-title', {
                color: '#63e2b7'
            }),
            c(
                '&-title',
                {
                    color: 'rgb(118, 124, 130)'
                },
                [
                    c('&:hover::before', {
                        background: '#1f2430'
                    })
                ]
            )
        ]),
        c('.mc-sub-menu', [
            c('&--child-active > .mc-sub-menu-title', {
                color: '#63e2b7'
            }),
            c('&-title', [
                c('&:hover::before', {
                    background: '#1f2430'
                })
            ])
        ]),
        c(
            '.mc-menu-item.mc-menu-item--disabled',
            {
                color: '#7a7d85'
            },
            [
                c('&::before', {
                    background: 'none'
                })
            ]
        ),
        c('.mc-sub-menu.mc-sub-menu--disabled, .mc-menu-item-group.mc-menu-item-group--disabled', [
            c(
                '.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title',
                {
                    color: '#7a7d85'
                },
                [
                    c('&::before', {
                        background: 'none'
                    })
                ]
            )
        ])
    ]),
    c('.mc-menu.mc-menu--horizontal', [
        c('& > .mc-menu-item', [
            c('&:hover, &--active', {
                color: '#63e2b7'
            })
        ]),
        c('& > .mc-sub-menu', [
            c('&--child-active, & > .mc-sub-menu-title:hover', {
                color: '#63e2b7'
            })
        ]),
        c('& > .mc-menu-item-group', [
            c('&--child-active, & > .mc-menu-item-group-title:hover', {
                color: '#63e2b7'
            })
        ]),
        c('& > .mc-menu-item.mc-menu-item--disabled, & > .mc-sub-menu.mc-sub-menu--disabled .mc-sub-menu-title, & > .mc-menu-item-group.mc-menu-item-group--disabled .mc-menu-item-group-title', {
            color: '#7a7d85'
        })
    ])
]);
