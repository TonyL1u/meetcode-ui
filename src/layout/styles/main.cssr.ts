import { c } from '../../_utils_';

export default c([
    c(
        '.mc-layout',
        {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            position: 'relative'
        },
        [
            c('&--with-sider', {
                flexDirection: 'row'
            })
        ]
    ),
    c('.mc-layout--with-sider > .mc-layout', { flex: 1 }),
    c('.mc-layout--with-sider > .mc-layout-content', { flex: 1 }),
    c('.mc-layout-scroll-area', { width: '100%', minHeight: '100%', overflow: 'auto', boxSizing: 'border-box' }),
    c('.mc-layout-sider', { width: 'var(--layout-sider-width)' }, [c('&--fixed', { position: 'absolute', right: 0, height: '100%' })])
]);
