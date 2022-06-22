import { c } from '../../_utils_';

export default c([
    c('.mc-switch', [
        c('&--checked .mc-switch-label-text--right, &:not(&--checked) .mc-switch-label-text--left', {
            color: '#059669'
        }),
        c('&--checked > &-label', {
            background: '#059669'
        })
    ]),
    c(
        '.mc-switch-label',
        {
            background: '#313540'
        },
        [
            c('&__content', {
                color: '#fff'
            }),
            c('&__handler', {
                background: 'var(--switch-handler-color, #000)',
                boxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)'
            })
        ]
    )
]);
