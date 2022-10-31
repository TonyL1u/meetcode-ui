import { c } from '../../_utils_';

export default c([
    c('.mc-menu:not(.mc-menu--horizontal), .mc-sub-menu--dropdown, .mc-menu-item-group--dropdown', [
        c('.mc-menu-item', [
            c('&:hover::before', {
                background: 'var(--mc-primary-color-99)'
            }),
            c('&--active::before', {
                background: 'var(--mc-primary-color-99)'
            }),
            c('&--active', {
                color: 'var(--mc-primary-color)'
            })
        ]),
        c('.mc-menu-item-group', [
            c('&--child-active > .mc-menu-item-group-title', {
                color: 'var(--mc-primary-color)'
            }),
            c(
                '&-title',
                {
                    color: 'rgb(118, 124, 130)'
                },
                [
                    c('&:hover::before', {
                        background: 'var(--mc-primary-color-99)'
                    })
                ]
            )
        ]),
        c('.mc-sub-menu', [
            c('&--child-active > .mc-sub-menu-title', {
                color: 'var(--mc-primary-color)'
            }),
            c('&-title', [
                c('&:hover::before', {
                    background: 'var(--mc-primary-color-99)'
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
                color: 'var(--mc-primary-color)'
            })
        ]),
        c('& > .mc-sub-menu', [
            c('&--child-active, & > .mc-sub-menu-title:hover', {
                color: 'var(--mc-primary-color)'
            })
        ]),
        c('& > .mc-menu-item-group', [
            c('&--child-active, & > .mc-menu-item-group-title:hover', {
                color: 'var(--mc-primary-color)'
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
