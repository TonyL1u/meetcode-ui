import { c } from '../../_utils_';

export default c([
    c('.mc-menu, .mc-menu-item-group, .mc-sub-menu', {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }),
    c(
        '.mc-menu',
        {
            transition: 'width 0.2s',
            width: '100%'
        },
        [
            c('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
                marginBottom: '4px'
            }),
            c(
                '&--collapsed',
                {
                    width: 'var(--menu-collapsed-width)'
                },
                [
                    c('& > .mc-menu-item, & > .mc-sub-menu .mc-sub-menu-title', {
                        padding: 'var(--menu-collapsed-padding)'
                    }),
                    c('.mc-menu-item__icon > .mc-icon, .mc-sub-menu-title__icon > .mc-icon', {
                        fontSize: 'var(--menu-collapsed-icon-size)'
                    })
                ]
            )
        ]
    ),
    c(
        '.mc-menu-item',
        {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s',
            paddingLeft: 'var(--menu-item-padding-left)',
            paddingRight: '16px'
        },
        [
            c(
                '&__icon',
                {
                    display: 'flex',
                    marginRight: '8px'
                },
                [
                    c('.mc-icon', {
                        transition: '0.2s'
                    })
                ]
            ),
            c('&__content', {
                flex: 1,
                overflow: 'hidden'
            })
        ]
    ),
    c('.mc-menu-item-group', [
        c('&-title', {
            height: '32px',
            paddingLeft: 'var(--menu-item-group-padding-left)',
            paddingRight: '16px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px'
        }),
        c(
            '&-children',
            {
                padding: 0,
                marginTop: '4px',
                overflow: 'hidden'
            },
            [
                c('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
                    marginBottom: '4px'
                })
            ]
        )
    ]),
    c('.mc-sub-menu', [
        c('&--collapsed > .mc-sub-menu-title', [
            c('.mc-sub-menu-title__arrow', {
                transform: 'rotate(180deg)'
            })
        ]),
        c(
            '&-title',
            {
                height: '40px',
                paddingLeft: 'var(--menu-submenu-padding-left)',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s'
            },
            [
                c(
                    '&__icon',
                    {
                        display: 'flex',
                        marginRight: '8px'
                    },
                    [
                        c('.mc-icon', {
                            transition: '0.2s'
                        })
                    ]
                ),
                c('&__content', {
                    flex: 1,
                    overflow: 'hidden'
                }),
                c('&__arrow', {
                    transition: '0.2s'
                })
            ]
        ),
        c(
            '&-children',
            {
                transition: '0.2s',
                padding: 0,
                marginTop: '4px',
                overflow: 'hidden'
            },
            [
                c('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
                    marginBottom: '4px'
                })
            ]
        ),
        c('&--in-popover', [
            c('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                padding: '0 16px'
            }),
            c('.mc-menu-item-group-children', [
                c('.mc-menu-item, .mc-sub-menu-title', {
                    padding: '0 16px 0 32px'
                })
            ])
        ])
    ])
]);
