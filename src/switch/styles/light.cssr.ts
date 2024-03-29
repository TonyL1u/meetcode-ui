import { c } from '../../_utils_';

export default c([
    c('.mc-switch', [
        c('&--checked .mc-switch-label-text--right, &:not(&--checked) .mc-switch-label-text--left', {
            color: 'var(--switch-checked-color, #10b981)'
        }),
        c('&--checked > &-label', {
            background: 'var(--switch-checked-color, #10b981)'
        })
    ]),
    c(
        '.mc-switch-label',
        {
            background: 'var(--switch-unchecked-color, rgba(0, 0, 0, 0.25))'
        },
        [
            c('&__content', {
                color: '#fff'
            }),
            c('&__handler', {
                background: 'var(--switch-handler-color, #fff)',
                boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)'
            })
        ]
    )
]);
