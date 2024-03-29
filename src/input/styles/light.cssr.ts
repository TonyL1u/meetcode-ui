import { c } from '../../_utils_';

export default c([
    c(
        '.mc-input',
        {
            background: '#fff'
        },
        [
            c('&:not(&--disabled):hover, &--focused', [
                c('.mc-input-wrapper::before, .mc-input-wrapper::after', {
                    borderColor: 'var(--input-active-border-color) !important'
                })
            ]),
            c(
                '&--disabled',
                {
                    background: 'rgb(250, 250, 252)'
                },
                [c('*', { color: '#bbb' })]
            ),
            c('&--focused > &-wrapper::after', {
                boxShadow: '0 0 0.5px 1.5px var(--input-state-border-shadow-color)'
            }),
            c('&__prefix, &__suffix, &__inner', {
                color: '#bbb'
            })
        ]
    ),
    c('.mc-input-clear-icon, .mc-input-eye-icon', [
        c('&:hover', {
            color: '#999'
        })
    ]),
    c('.mc-input-wrapper', [
        c('&::before, &::after', {
            border: '1px solid var(--input-border-color)'
        })
    ]),
    c('.mc-input-word-count', {
        color: '#bbb'
    }),
    c('.mc-input-prepend, .mc-input-append', {
        border: '1px solid #e0e0e6',
        background: 'rgb(250, 250, 252)'
    }),
    c('.mc-input-prepend', {
        borderRight: 'none'
    }),
    c('.mc-input-append', {
        borderLeft: 'none'
    })
]);
