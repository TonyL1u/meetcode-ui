import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c('.mc-popselect-option', [
        c('&:not(&--disabled):hover', {
            background: '#f2fcf8'
        }),
        c('&--selected', {
            background: '#f2fcf8',
            color: '#10b981'
        }),
        c('&--disabled', {
            color: '#bbb',
            background: ' rgba(0, 0, 0, 0.02)'
        })
    ])
]);
