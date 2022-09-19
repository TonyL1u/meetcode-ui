import { c } from '../../_utils_';

export default c([
    c('.mc-anchor-type-background .mc-anchor-link--active > .mc-anchor-link-title', {
        background: '#1f2430'
    }),
    c('.mc-anchor-link', [
        c('&--active > &-title', {
            color: '#63e2b7'
        })
    ]),
    c('.mc-anchor-link-title', [
        c('&:hover', {
            color: '#63e2b7'
        })
    ]),
    c('.mc-anchor-indicator', [
        c('&-track', {
            background: '#ffffff33'
        }),
        c('&-marker', {
            background: '#63e2b7'
        })
    ])
]);
