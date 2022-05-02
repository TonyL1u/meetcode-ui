import { c } from '../../_utils_';

export default c(
    '.mc-drawer',
    {
        background: '#313540',
        color: '#eee'
    },
    [
        c('&:not(.mc-drawer--pure)', [
            c('.mc-drawer-close-icon', {
                color: '#eee'
            })
        ])
    ]
);
