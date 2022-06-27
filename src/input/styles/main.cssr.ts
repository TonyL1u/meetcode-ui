import { c } from '../../_utils_';

export default c([
    c(
        '.mc-input',
        {
            position: 'relative',
            cursor: 'text',
            maxWidth: '100%',
            display: 'flex',
            transition: 'background 0.2s'
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
            c('&-el', {
                appearance: 'none',
                border: 'none',
                outline: 'none',
                padding: '5.5px 0px',
                margin: 0,
                lineHeight: '21px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                width: '100%',
                maxWidth: '100%',
                background: 'inherit'
            }),
            c('&--autosize input&-el', { minWidth: '100%', width: 'var(--input-autosize-width)' }),
            c('textarea&-el', {
                fontSize: '14px',
                resize: 'var(--input-textarea-resizable)' as any,
                overflow: 'auto',
                height: 'var(--input-textarea-autosize-height)',
                minHeight: 'var(--input-textarea-min-height)',
                maxHeight: 'var(--input-textarea-max-height)',
                paddingRight: '12px'
            }),
            c('&__prefix, &__suffix, &__inner', {
                display: 'flex',
                height: '100%',
                alignItems: 'center'
            }),
            c('&__prefix', {
                marginRight: '4px'
            }),
            c('&__suffix > *', {
                marginLeft: '4px'
            }),
            c('&__inner', {
                flex: 1,
                position: 'relative',
                overflow: 'hidden'
            }),
            c('&--textarea &__suffix', {
                position: 'absolute',
                top: 0,
                right: '12px',
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
    c('.mc-input-clear-icon, .mc-input-eye-icon', {
        cursor: 'pointer',
        transition: 'all 0.2s'
    }),
    c('.mc-input-wrapper', {
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        flex: 1,
        borderRadius: '3px',
        overflow: 'hidden',
        transition: 'all 0.2s',
        zIndex: 2,
        position: 'relative'
    }),
    c('.mc-input-placeholder', {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        lineHeight: '32px',
        display: 'flex',
        pointerEvents: 'none'
    }),
    c('.mc-input-word-count', {
        fontSize: '12px',
        lineHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
    }),
    c('.mc-input-prepend, .mc-input-append', {
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        cursor: 'default'
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
    })
]);
