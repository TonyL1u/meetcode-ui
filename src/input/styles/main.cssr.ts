import { c } from '../../_utils_';

export default c([
    c(
        '.mc-input',
        {
            position: 'relative',
            cursor: 'text',
            maxWidth: '100%',
            display: 'flex',
            transition: 'background 0.2s',
            fontSize: 'var(--input-font-size)'
        },
        [
            c('&:not(&--autosize), &--textarea', {
                width: '100%'
            }),
            c(
                '&--disabled',

                [c('*', { cursor: 'not-allowed' })]
            ),
            c('&--with-prepend > &-wrapper', {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
            }),
            c('&--with-append > &-wrapper', {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
            }),
            c('&--composed &-wrapper', [
                c('.mc-input-el', {
                    textAlign: 'center'
                }),
                c('.mc-input-placeholder', {
                    justifyContent: 'center'
                })
            ]),
            c('&-el', {
                fontSize: 'var(--input-font-size)',
                appearance: 'none',
                border: 'none',
                outline: 'none',
                padding: 'var(--input-el-padding)',
                margin: 0,
                lineHeight: 'var(--input-el-line-height)',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                width: '100%',
                maxWidth: '100%',
                background: 'inherit',
                zIndex: 2
            }),
            c('&--autosize input&-el', { minWidth: '100%', width: 'var(--input-autosize-width)' }),
            c('textarea&-el', {
                resize: 'var(--input-textarea-resizable)' as any,
                overflow: 'auto',
                height: 'var(--input-textarea-autosize-height)',
                minHeight: 'var(--input-textarea-min-height)',
                maxHeight: 'var(--input-textarea-max-height)',
                paddingRight: 'var(--input-padding)'
            }),
            c('&__prefix, &__suffix, &__inner', {
                display: 'flex',
                height: '100%',
                alignItems: 'center'
            }),
            c('&__prefix', {
                marginRight: 'var(--input-prefix-margin)'
            }),
            c('&__suffix > *', {
                marginLeft: 'var(--input-suffix-margin)'
            }),
            c('&__inner', {
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '100%'
            }),
            c('&__separator', {
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                height: '100%'
            }),
            c('&--textarea &__suffix', {
                position: 'absolute',
                top: 0,
                right: 'var(--input-padding)',
                alignItems: 'flex-end'
            }),
            c('&--textarea &-wrapper', {
                paddingRight: '0px'
            })
        ]
    ),
    c('.mc-input-suffix-content', {
        display: 'flex'
    }),
    c('.mc-input-eye-icon', {
        cursor: 'pointer',
        transition: 'all 0.2s'
    }),
    c('.mc-input-clear-icon', {
        transition: 'all 0.2s',
        opacity: 0
    }),
    c(
        '.mc-input-wrapper',
        {
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--input-wrapper-padding)',
            flex: 1,
            borderRadius: '3px',
            transition: 'all 0.2s',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
        },
        [
            c('&::before, &::after', {
                content: "''",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                borderRadius: 'inherit',
                boxSizing: 'border-box',
                pointerEvents: 'none'
            }),
            c('&::after', {
                transition: '0.2s'
            })
        ]
    ),
    c('.mc-input-placeholder', {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        lineHeight: 'var(--input-height)',
        display: 'flex',
        pointerEvents: 'none',
        zIndex: 1
    }),
    c('.mc-input-word-count', {
        fontSize: 'var(--input-word-count-font-size)',
        lineHeight: 'var(--input-height)',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
    }),
    c('.mc-input-prepend, .mc-input-append', {
        padding: 'var(--input-wrapper-padding)',
        display: 'flex',
        alignItems: 'center',
        cursor: 'default',
        transition: 'background 0.2s'
    }),
    c('.mc-input-prepend', {
        borderRight: 'none',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px'
    }),
    c('.mc-input-append', {
        borderLeft: 'none',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px'
    }),
    c(
        '.mc-input-group',
        {
            display: 'flex'
        },
        [
            c('& > .mc-button:not(:last-child):not(:first-child)', {
                borderRadius: 0
            }),
            c('& > .mc-button:first-child:not(:last-child)', {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
            }),
            c('& > .mc-button:last-child:not(:first-child)', {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
            }),
            c('& > .mc-button--default:not(:last-child)', [
                c('&::before', {
                    borderRightWidth: 0
                }),
                c('&::after', {
                    right: '-1px'
                })
            ]),
            c('& > .mc-button--default::after', {
                borderColor: 'transparent'
            }),
            c('& > .mc-button', {
                minHeight: '100%'
            }),
            c('& > .mc-button::after', {
                zIndex: 1
            }),
            c('& > .mc-input:not(:last-child):not(:first-child) > .mc-input-wrapper', {
                borderRadius: 0
            }),
            c('& > .mc-input:first-child:not(:last-child) > .mc-input-wrapper', {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
            }),
            c('& > .mc-input:last-child:not(:first-child) > .mc-input-wrapper', {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
            }),
            c('& > .mc-input:not(:last-child) > .mc-input-wrapper', [
                c('&::before', {
                    borderRightWidth: 0
                }),
                c('&::after', {
                    right: '-1px',
                    zIndex: 1,
                    borderColor: 'transparent'
                })
            ]),
            c('& > .mc-input', {
                flex: 1
            }),
            c('& > .mc-button:not(.mc-button--default) + .mc-input', {
                marginLeft: '-1px'
            })
        ]
    )
]);
