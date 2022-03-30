import { c } from '../../_utils_';

export default c(
    '.mc-modal',
    {
        background: '#313540',
        color: '#eee'
    },
    [
        c('&:not(.mc-modal--pure)', [
            c('.mc-modal-close-icon', {
                color: '#eee'
            })
        ])
    ]
);
