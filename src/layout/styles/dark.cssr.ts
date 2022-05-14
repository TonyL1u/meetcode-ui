import { c } from '../../_utils_';

export default c([
    c('.mc-layout-content', {
        color: '#FFFFFFD1',
        background: 'rgb(16, 16, 20)'
    }),
    c('.mc-layout-sider, .mc-layout-header, .mc-layout-footer', {
        color: '#FFFFFFD1',
        background: 'rgb(24, 24, 28)'
    }),
    c('.mc-layout-sider--bordered.mc-layout-sider--left, .mc-layout-sider--bordered.mc-layout-sider--right, .mc-layout-header--bordered, .mc-layout-footer--bordered', { borderColor: 'rgba(255, 255, 255, 0.09)' }),
    c('.mc-layout-sider__collapse-bar-trigger', [
        c('&::before, &::after', {
            background: 'rgba(64, 64, 67, 1)'
        }),
        c('&:hover:before, &:hover:after', {
            background: 'rgba(88, 88, 91, 1)'
        })
    ])
]);
