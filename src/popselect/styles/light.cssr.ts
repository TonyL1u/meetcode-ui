import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c('.mc-popselect-option', [
        c('&--pending:not(&--disabled)', {
            background: '#f2fcf8'
        }),
        c('&--selected', {
            color: '#10b981',
            fontWeight: 'bold'
        }),
        c('&--disabled', {
            color: '#bbb',
            background: ' rgba(0, 0, 0, 0.02)'
        })
    ])
]);
