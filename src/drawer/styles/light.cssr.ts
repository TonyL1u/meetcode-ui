import { c } from '../../_utils_';

export default c(
    '.mc-drawer',
    {
        background: '#fff'
    },
    [
        c('&:not(.mc-drawer--pure)', [
            c('.mc-drawer-close-icon', {
                color: '#666'
            })
        ])
    ]
);
