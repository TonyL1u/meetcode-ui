import { c } from '../../_utils_';

export default c([
    c(
        '.mc-layout',
        {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            position: 'relative',
            transition: 'background 0.2s'
        },
        [
            c('&--with-sider', {
                flexDirection: 'row'
            }),
            c('&--header-fixed', [
                c('& > .mc-layout-header', {
                    width: '100%',
                    position: 'absolute',
                    top: 0
                }),
                c('& > .mc-layout-content', {
                    paddingTop: 'var(--layout-header-height)',
                    overflow: 'auto'
                })
            ])
        ]
    ),
    c('.mc-layout--with-sider > .mc-layout', { flex: 1 }),
    c('.mc-layout--with-sider > .mc-layout-content', { flex: 1 }),
    c('.mc-layout-scroll-area', { width: '100%', minHeight: '100%', overflow: 'auto', boxSizing: 'border-box' }),
    c('.mc-layout-column-preset', {}),
    c('.mc-layout-row-preset', [c('& > .mc-layout-content', { flex: 1 })]),
    c('.mc-layout-sider, .mc-layout-header, .mc-layout-footer', { transition: 'border-color 0.2s' }),
    c(
        '.mc-layout-sider',
        {
            position: 'relative',
            width: 'var(--layout-sider-width)',
            transition: 'width 0.2s'
        },
        [
            c('&--fixed', { position: 'absolute', right: 0, height: '100%' }),
            c('&--bordered', { borderRight: '1px solid rgb(239, 239, 245)' }),
            c('&-scroll-area', {
                flexGrow: 1,
                flexShrink: 0,
                boxSizing: 'border-box',
                height: '100%',
                maxWidth: '100%',
                overflow: 'auto'
            }),
            c('&-collapse-trigger', {
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%) translateX(50%)',
                zIndex: 10
            })
        ]
    ),
    c('.mc-layout-header', {}, [c('&--bordered', { borderBottom: '1px solid rgb(239, 239, 245)' })]),
    c('.mc-layout-content', {}, []),
    c('.mc-layout-footer', {}, [c('&--bordered', { borderTop: '1px solid rgb(239, 239, 245)' })])
]);
