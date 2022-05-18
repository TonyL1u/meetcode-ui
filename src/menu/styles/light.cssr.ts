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
    c('.mc-menu-item-group', [
        c('&-title', {
            color: 'rgb(118, 124, 130)'
        })
    ]),
    c('.mc-sub-menu', {}, [
        c('&--child-active > .mc-sub-menu-title', {
            color: '#10b981'
        }),
        c('&-title', [
            c('&:hover', {
                background: '#f2fcf8'
            })
        ])
    ])
]);
