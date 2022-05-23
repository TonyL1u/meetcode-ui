import { c } from '../../_utils_';

export default c([
    c('.mc-menu:not(.mc-menu--horizontal), .mc-sub-menu--dropdown, .mc-menu-item-group--dropdown', [
        c('.mc-menu-item', [
            c('&:hover::before', {
                background: '#f2fcf8'
            }),
            c('&--active::before', {
                background: '#f2fcf8'
            }),
            c('&--active', {
                color: '#10b981'
            })
        ]),
        c('.mc-menu-item-group', [
            c('&--child-active > .mc-menu-item-group-title', {
                color: '#10b981'
            }),
            c(
                '&-title',
                {
                    color: 'rgb(118, 124, 130)'
                },
                [
                    c('&:hover::before', {
                        background: '#f2fcf8'
                    })
                ]
            )
        ]),
        c('.mc-sub-menu', [
            c('&--child-active > .mc-sub-menu-title', {
                color: '#10b981'
            }),
            c('&-title', [
                c('&:hover::before', {
                    background: '#f2fcf8'
                })
            ])
        ]),
        c(
            '.mc-menu-item.mc-menu-item--disabled',
            {
                color: '#bbb'
            },
            [
                c('&::before', {
                    background: 'rgba(0, 0, 0, 0.02)'
                })
            ]
        ),
        c('.mc-sub-menu.mc-sub-menu--disabled, .mc-menu-item-group.mc-menu-item-group--disabled', [
            c(
                '.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title',
                {
                    color: '#bbb'
                },
                [
                    c('&::before', {
                        background: 'rgba(0, 0, 0, 0.02)'
                    })
                ]
            )
        ])
    ]),
    c('.mc-menu.mc-menu--horizontal', [
        c('& > .mc-menu-item', [
            c('&:hover, &--active', {
                color: '#10b981'
            })
        ]),
        c('& > .mc-sub-menu', [
            c('&--child-active, & > .mc-sub-menu-title:hover', {
                color: '#10b981'
            })
        ]),
        c('& > .mc-menu-item-group', [
            c('&--child-active, & > .mc-menu-item-group-title:hover', {
                color: '#10b981'
            })
        ]),
        c('& > .mc-menu-item.mc-menu-item--disabled, & > .mc-sub-menu.mc-sub-menu--disabled .mc-sub-menu-title, & > .mc-menu-item-group.mc-menu-item-group--disabled .mc-menu-item-group-title', {
            color: '#bbb'
        })
    ]),
    c('.mc-menu.mc-menu--disabled:not(.mc-menu--horizontal)', [
        c(
            '.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title',
            {
                color: '#bbb'
            },
            [
                c('&::before', {
                    background: 'rgba(0, 0, 0, 0.02)'
                })
            ]
        )
    ]),
    c('.mc-menu.mc-menu--disabled.mc-menu--horizontal', [
        c('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
            color: '#bbb'
        })
    ])
]);
