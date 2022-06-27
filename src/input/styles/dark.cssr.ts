import { c } from '../../_utils_';

export default c([
    c(
        '.mc-input',
        {
            background: 'rgb(24, 24, 28)'
        },
        [
            c('&:not(&--disabled):hover, &--focused', [
                c('.mc-input-wrapper', {
                    borderColor: '#63e2b7'
                })
            ]),
            c(
                '&--disabled',
                {
                    background: 'rgba(255, 255, 255, 0.06)'
                },
                [c('*', { color: '#666' })]
            ),
            c('&-el', {
                color: '#FFFFFFD1'
            }),
            c('&--focused > &-wrapper', {
                boxShadow: '0 0 0.5px 1.5px rgba(99, 26, 183, 0.4)'
            }),
            c('&__prefix, &__suffix, &__inner', {
                color: '#666'
            })
        ]
    ),
    c('.mc-input-clear-icon, .mc-input-eye-icon', [
        c('&:hover', {
            color: '#999'
        })
    ]),
    c('.mc-input-wrapper', {
        border: '1px solid rgba(255, 255, 255, 0.09)'
    }),
    c('.mc-input-word-count', {
        color: '#666'
    }),
    c('.mc-input-prepend, .mc-input-append', {
        border: '1px solid rgba(255, 255, 255, 0.09)',
        background: 'rgb(16, 16, 20)'
    }),
    c('.mc-input-prepend', {
        borderRight: 'none'
    }),
    c('.mc-input-append', {
        borderLeft: 'none'
    })
]);
