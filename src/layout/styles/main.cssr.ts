import { c } from '../../_utils_';

export default c([
    c(
        '.mc-layout',
        {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            position: 'relative'
        },
        [
            c('&--with-sider', {
                flexDirection: 'row'
            }),
            c('&--header-fixed', [
                c('& > .mc-layout-header', {
                    width: '100%',
                    position: 'absolute',
                    top: 0
                }),
                c('& > .mc-layout-content', {
                    paddingTop: 'var(--layout-header-height)',
                    overflow: 'auto'
                })
            ])
        ]
    ),
    c('.mc-layout, .mc-layout-header, .mc-layout-content, .mc-layout-footer', {
        transition: 'background 0.2s, border-color 0.2s'
    }),
    c('.mc-layout-sider', {
        transition: 'background 0.2s, border-color 0.2s, width 0.2s'
    }),
    c('.mc-layout--with-sider > .mc-layout', { flex: 1 }),
    c('.mc-layout--with-sider > .mc-layout-content', { flex: 1 }),
    c('.mc-layout__scroll-area', { width: '100%', minHeight: '100%', overflow: 'auto', boxSizing: 'border-box' }),
    c('.mc-layout-column-preset', {}),
    c('.mc-layout-row-preset', [c('& > .mc-layout-content', { flex: 1 })]),
    c(
        '.mc-layout-sider',
        {
            position: 'relative',
            width: 'var(--layout-sider-width)',
            display: 'flex',
            justifyContent: 'flex-end'
        },
        [
            c('&--fixed', { position: 'absolute', right: 0, height: '100%' }),
            c('&--bordered&--left', { borderRight: '1px solid' }),
            c('&--bordered&--right', { borderLeft: '1px solid' }),
            c('&__scroll-area', {
                flexGrow: 1,
                flexShrink: 0,
                boxSizing: 'border-box',
                height: '100%',
                maxWidth: '100%',
                overflow: 'auto',
                minWidth: 'var(--layout-sider-scroll-area-min-width)'
            }),
            c('&__collapse-button-trigger, &__collapse-bar-trigger', {
                position: 'absolute',
                top: 'var(--layout-sider-collapse-button-trigger-top)',
                bottom: 'var(--layout-sider-collapse-button-trigger-bottom)',
                zIndex: 10,
                transition: '0.2s',
                cursor: 'pointer'
            }),
            c('&--left > .mc-layout-sider__collapse-button-trigger', {
                right: '-1px',
                transform: 'translateY(-50%) translateX(50%)'
            }),
            c('&--right > .mc-layout-sider__collapse-button-trigger', {
                left: '-1px',
                transform: 'translateY(-50%) translateX(-50%) rotate(-180deg)'
            }),
            c('&--collapsed&--left > .mc-layout-sider__collapse-button-trigger', {
                right: '-14px',
                transform: 'translateY(-50%) translateX(50%) rotate(-180deg)'
            }),
            c('&--collapsed&--right > .mc-layout-sider__collapse-button-trigger', {
                left: '-14px',
                transform: 'translateY(-50%) translateX(-50%)'
            }),
            c(
                '&__collapse-bar-trigger',
                {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20px',
                    alignItems: 'center',
                    transform: 'translateY(-50%)'
                },
                [
                    c('&::before, &::after', {
                        content: '""',
                        height: '37.5px',
                        width: '4px',
                        borderRadius: '2px',
                        display: 'block',
                        position: 'relative',
                        transition: '0.2s'
                    }),
                    c('&::before', {
                        top: '1.5px'
                    }),
                    c('&::after', {
                        bottom: '1.5px'
                    })
                ]
            ),
            c(
                '&--left > .mc-layout-sider__collapse-bar-trigger',
                {
                    right: '-20px'
                },
                [
                    c('&:hover:before', {
                        transform: 'rotate(10deg)'
                    }),
                    c('&:hover:after', {
                        transform: 'rotate(-10deg)'
                    })
                ]
            ),
            c(
                '&--right > .mc-layout-sider__collapse-bar-trigger',
                {
                    left: '-20px'
                },
                [
                    c('&:hover::before', {
                        transform: 'rotate(-10deg)'
                    }),
                    c('&:hover::after', {
                        transform: 'rotate(10deg)'
                    })
                ]
            ),
            c('&--collapsed&--left > .mc-layout-sider__collapse-bar-trigger', [
                c('&:hover::before', {
                    transform: 'rotate(-10deg)'
                }),
                c('&:hover::after', {
                    transform: 'rotate(10deg)'
                })
            ]),
            c('&--collapsed&--right > .mc-layout-sider__collapse-bar-trigger', [
                c('&:hover:before', {
                    transform: 'rotate(10deg)'
                }),
                c('&:hover:after', {
                    transform: 'rotate(-10deg)'
                })
            ])
        ]
    ),
    c('.mc-layout-header', {}, [c('&--bordered', { borderBottom: '1px solid' })]),
    c('.mc-layout-content', {}, []),
    c('.mc-layout-footer', {}, [c('&--bordered', { borderTop: '1px solid' })])
]);
