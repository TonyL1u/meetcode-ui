import { c } from '../../_utils_';

export default c(
    '.mc-modal',
    {
        background: '#fff'
    },
    [
        c('&:not(.mc-modal--pure)', [
            c('.mc-modal-close-icon', {
                color: '#666'
            })
        ])
    ]
);
