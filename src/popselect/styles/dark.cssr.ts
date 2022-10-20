import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c('.mc-popselect-option', [
        c('&--pending:not(&--disabled)', {
            background: '#1f2430'
        }),
        c('&--selected', {
            color: '#63e2b7',
            fontWeight: 'bold'
        }),
        c('&--disabled', {
            color: '#7a7d85'
        })
    ])
]);
