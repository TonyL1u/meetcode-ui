import { c } from '../../_utils_';

export default c([
    c(
        '.mc-input',
        {
            background: 'rgb(24, 24, 28)'
        },
        [
            c('&:not(&--disabled):hover, &--focused', [
                c('.mc-input-wrapper::before, .mc-input-wrapper::after', {
                    borderColor: '#63e2b7'
                })
            ]),
            c(
                '&--disabled',
                {
                    background: 'rgba(255, 255, 255, 0.06)'
                },
                [c('*, .mc-input-el', { color: '#666' })]
            ),
            c('&-el', {
                color: '#FFFFFFD1'
            }),
            c('&--focused > &-wrapper::after', {
                boxShadow: '0 0 0.5px 1.5px #5acea700'
            }),
            c('&__prefix, &__suffix, &-placeholder', {
                color: '#666'
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
            border: '1px solid transparent'
        })
    ]),
    c('.mc-input-word-count', {
        color: '#666'
    }),
    c('.mc-input-prepend, .mc-input-append', {
        border: '1px solid transparent',
        background: 'rgb(16, 16, 20)'
    }),
    c('.mc-input-prepend', {
        borderRight: 'none'
    }),
    c('.mc-input-append', {
        borderLeft: 'none'
    }),
    c(
        '.mc-input-group',
        {
            display: 'flex'
        },
        [
            c('.mc-input-wrapper', [
                c('&::before, &::after', {
                    border: '1px solid #50535a'
                })
            ])
        ]
    )
]);
