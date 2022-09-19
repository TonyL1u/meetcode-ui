import { c } from '../../_utils_';

export default c([
    c('.mc-anchor-type-background .mc-anchor-link--active > .mc-anchor-link-title', {
        background: '#f2fcf8'
    }),
    c('.mc-anchor-link', [
        c('&--active > &-title', {
            color: '#10b981'
        })
    ]),
    c('.mc-anchor-link-title', [
        c('&:hover', {
            color: '#10b981'
        })
    ]),
    c('.mc-anchor-indicator', [
        c('&-track', {
            background: '#f0f0f0'
        }),
        c('&-marker', {
            background: '#10b981'
        })
    ])
]);
