import { c } from '../../_utils_';

export default c([
    c('.mc-layout-content', {
        color: '#333639'
    }),
    c('.mc-layout-sider, .mc-layout-header, .mc-layout-footer', {
        color: '#333639'
    }),
    c('.mc-layout-sider--bordered.mc-layout-sider--left, .mc-layout-sider--bordered.mc-layout-sider--right, .mc-layout-header--bordered, .mc-layout-footer--bordered', { borderColor: 'rgb(239, 239, 245)' }),
    c('.mc-layout-sider__collapse-bar-trigger', [
        c('&::before, &::after', {
            background: 'rgba(191, 191, 191, 1)'
        }),
        c('&:hover:before, &:hover:after', {
            background: 'rgba(153, 153, 153, 1)'
        })
    ])
]);
