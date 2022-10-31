import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c('.mc-popselect-option', [
        c('&--pending:not(&--disabled)', {
            background: 'var(--mc-primary-color-99)'
        }),
        c('&--selected', {
            color: 'var(--mc-primary-color)',
            fontWeight: 'bold'
        }),
        c('&--disabled', {
            color: '#bbb',
            background: ' rgba(0, 0, 0, 0.02)'
        })
    ])
]);
