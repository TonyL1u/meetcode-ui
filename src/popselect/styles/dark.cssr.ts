import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c('.mc-popselect-option', [
        c('&:not(&--disabled):hover', {
            background: '#1f2430'
        }),
        c('&--selected', {
            background: '#1f2430',
            color: '#63e2b7'
        }),
        c('&--disabled', {
            color: '#7a7d85'
        })
    ])
]);
