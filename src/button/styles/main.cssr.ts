import { c } from '../../_utils_';

export default c([
    c(
        '.mc-button-group',
        {
            display: 'inline-flex'
        },
        [
            c('.mc-button--default::after', {
                borderColor: 'transparent',
                zIndex: 1
            })
        ]
    ),
    c('.mc-button-group:not(.mc-button-group--vertical)', [
        c('.mc-button--default:not(:last-child)', [
            c('&::before', {
                borderRightWidth: 0
            }),
            c('&::after', {
                right: '-1px'
            })
        ]),
        c('.mc-button:last-child:not(:first-child)', {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        }),
        c('.mc-button:first-child:not(:last-child)', {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }),
        c('.mc-button:not(:last-child):not(:first-child)', {
            borderRadius: 0
        })
    ]),
    c(
        '.mc-button-group.mc-button-group--vertical',
        {
            flexDirection: 'column'
        },
        [
            c('.mc-button--default:not(:last-child)', [
                c('&::before', {
                    borderBottomWidth: 0
                }),
                c('&::after', {
                    bottom: '-1px'
                })
            ]),
            c('.mc-button:last-child:not(:first-child)', {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0
            }),
            c('.mc-button:first-child:not(:last-child)', {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }),
            c('.mc-button:not(:last-child):not(:first-child)', {
                borderRadius: 0
            })
        ]
    ),
    c(
        '.mc-button',
        {
            background: 'var(--button-default-background-color)',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            padding: 'var(--button-padding)',
            width: 'var(--button-width)',
            height: 'var(--button-height)',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            fontFamily: 'v-sans',
            borderRadius: 'var(--button-radius)',
            color: 'var(--button-default-color)',
            fontSize: 'var(--button-font-size)',
            transition: 'background-color 0.2s',
            flexDirection: 'var(--button-flex-direction)' as any
        },
        [
            c('&__icon, &__content', {
                transition: 'color 0.2s',
                fontSize: 'inherit',
                lineHeight: 1,
                minWidth: 'max-content'
            }),
            c('&__icon', {
                display: 'flex',
                fontSize: 'var(--button-icon-size)',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'var(--button-icon-size)',
                minWidth: 'var(--button-icon-size)'
            }),
            c('& > span.left:not(:last-child)', {
                marginRight: 'var(--button-icon-margin)'
            }),
            c('& > span.right:not(:last-child)', {
                marginLeft: 'var(--button-icon-margin)'
            }),
            c('&--rippling::after', {
                animation: 'mc-button-border-ripple-out 0.5s'
            }),
            c('&::before, &::after', {
                content: "''",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                borderRadius: 'inherit',
                boxSizing: 'border-box',
                border: ' 1px solid var(--button-default-border-color)'
            }),
            c('&::after', {
                transition: 'border-color 0.2s'
            }),
            c('&:hover', {
                color: 'var(--button-hover-color)',
                background: 'var(--button-hover-background-color)'
            }),
            c('&:not(&--disabled):hover::after', {
                borderColor: 'var(--button-hover-border-color) !important'
            }),
            c(
                '&:focus',
                {
                    color: 'var(--button-hover-color)',
                    outline: 'none',
                    background: 'var(--button-hover-background-color)'
                },
                [
                    c('&::after', {
                        borderColor: 'var(--button-hover-border-color) !important'
                    })
                ]
            ),
            c(
                '&:active',
                {
                    color: 'var(--button-active-color)',
                    background: 'var(--button-active-background-color)'
                },
                [
                    c('&::after', {
                        borderColor: 'var(--button-active-border-color)'
                    })
                ]
            ),
            c(
                '&:disabled',
                {
                    cursor: 'not-allowed',
                    color: 'var(--button-disabled-color)',
                    background: 'var(--button-disabled-background-color)'
                },
                [
                    c('&::after', {
                        borderColor: 'var(--button-disabled-border-color)'
                    })
                ]
            )
        ]
    ),
    c('.mc-button--dashed', [
        c('&::before, &::after', {
            borderStyle: 'dashed'
        })
    ]),
    c('.mc-button--text', [
        c('&.mc-button--disabled, &:hover, &:focus', {
            background: 'rgba(0, 0, 0, 0.02)'
        })
    ]),
    c('@keyframes mc-button-border-ripple-out', {
        from: {
            boxShadow: '0 0 0.5px 0 var(--button-active-border-color)'
        },
        to: {
            boxShadow: '0 0 0.5px 4px var(--button-ripple-color)'
        }
    })
]);
