import { c } from '../../_utils_';

export default c([
    c('.mc-menu-item', [
        c('&:hover', {
            background: '#1f2430'
        }),
        c('&--active', {
            background: '#1f2430',
            color: '#10b981'
        })
    ]),
    c('.mc-sub-menu', {}, [
        c('&-title', [
            c('&:hover', {
                background: '#1f2430'
            })
        ])
    ])
]);
