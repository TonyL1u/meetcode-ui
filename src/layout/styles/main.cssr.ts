import { c } from '../../_utils_';

export default c([
    c(
        '.mc-layout',
        {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
        },
        [
            c('&--with-sider', {
                flexDirection: 'row'
            })
        ]
    ),
    c('.mc-layout--with-sider > .mc-layout', { flex: 1 }),
    c('.mc-layout--with-sider > .mc-layout-content', { flex: 1 }),
    c('.mc-layout-content, .mc-layout-sider', { overflow: 'auto' })
]);
