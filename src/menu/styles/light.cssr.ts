import { c } from '../../_utils_';

export default c([
    c('.mc-menu-item', [
        c('&:hover', {
            background: '#f2fcf8'
        }),
        c('&--active', {
            background: '#f2fcf8',
            color: '#10b981'
        })
    ]),
    c('.mc-sub-menu', {}, [
        c('&-title', [
            c('&:hover', {
                background: '#f2fcf8'
            })
        ])
    ])
]);
