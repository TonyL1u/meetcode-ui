import { c } from '../../_utils_';

export default c([
    c('.mc-tabs', [
        c('&__header-scroll-content', {
            display: 'flex',
            position: 'relative',
            minWidth: 'max-content'
        }),
        c('&-tab', {
            cursor: 'pointer',
            display: 'inline-flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }),
        c('&-tab--disabled', {
            cursor: 'not-allowed'
        })
    ]),
    c('.mc-tabs__header', [
        c('&--center &-scroll-content', {
            justifyContent: 'center'
        }),
        c('&--stretch .mc-tabs-tab', {
            flex: 1
        }),
        c('&--with-line', [
            c('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                borderTop: 'none'
            }),
            c('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                borderBottom: 'none'
            })
        ]),
        c('&-bar', {
            transition: '0.2s',
            position: 'absolute',
            width: '8192px'
        })
    ]),
    c('.mc-tabs__content', {
        paddingTop: '12px',
        overflow: 'auto'
    }),
    c(
        '.mc-tabs--bar .mc-tabs__header',
        {
            position: 'relative'
        },
        [
            c(
                '.mc-tabs-tab',
                {
                    margin: '0 var(--tab-gap)',
                    padding: '12px 0',
                    position: 'relative'
                },
                [
                    c('&:first-child', {
                        marginLeft: 0
                    }),
                    c('&:last-child', {
                        marginRight: 0
                    }),
                    c('&__label', {
                        display: 'flex'
                    })
                ]
            ),
            c('&--bar-scale .mc-tabs-tab', [
                c('&::after', {
                    content: "''",
                    position: 'absolute',
                    left: 0,
                    bottom: '-1px',
                    width: '100%',
                    height: '2px',
                    transition: 'transform 0.25s ease-in-out',
                    transform: 'scaleX(0)'
                }),
                c('&--active::after', {
                    transform: 'scaleX(1)'
                })
            ]),
            c(
                '&-bar',
                {
                    zIndex: 1,
                    height: '2px'
                },
                [c('&--bottom', { bottom: 0 }), c('&--top', { top: 0 })]
            )
        ]
    ),
    c(
        '.mc-tabs--empty .mc-tabs-tab',
        {
            margin: '0 var(--tab-gap)',
            padding: '12px 0'
        },
        [
            c('&:first-child', {
                marginLeft: 0
            }),
            c('&:last-child', {
                marginRight: 0
            }),
            c('&__label', {
                display: 'flex'
            })
        ]
    ),
    c(
        '.mc-tabs--card .mc-tabs-tab',
        {
            padding: '8px var(--tab-gap)',
            transition: '0.2s'
        },
        [
            c(
                '&--active',
                {
                    position: 'relative'
                },
                [
                    c('&::before', {
                        content: "''",
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '2px'
                    }),
                    c('&::after', {
                        content: "''",
                        position: 'absolute',
                        left: 0,
                        bottom: '-1px',
                        width: '100%',
                        height: '1px'
                    })
                ]
            )
        ]
    ),
    c('.mc-tabs--segment', [
        c(
            '.mc-tabs__header',
            {
                alignItems: 'center',
                boxSizing: 'border-box',
                borderRadius: '4px',
                position: 'relative'
            },
            [
                c('&-scroll-content', {
                    padding: '2px'
                }),
                c('&-bar', {
                    borderRadius: '4px',
                    top: '2px',
                    height: 'calc(100% - 4px)',
                    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)'
                }),
                c(
                    '&--bar-fade .mc-tabs-tab',
                    {
                        transition: 'background 0.2s'
                    },
                    [
                        c('&--active', {
                            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)'
                        })
                    ]
                )
            ]
        ),
        c(
            '.mc-tabs-tab',
            {
                padding: '4px 0',
                borderRadius: '2px',
                margin: 0,
                flex: 1
            },
            [c('&--active', { fontWeight: 'bold' })]
        )
    ])
]);
