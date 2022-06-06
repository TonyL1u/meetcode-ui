import { c } from '../../_utils_';

export default c([
    c('.mc-anchor, .mc-anchor-link', {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    }),
    c(
        '.mc-anchor-link',
        {
            paddingLeft: '10px'
        },
        [
            c('&--active > &-title', {
                // background: '#f2fcf8',
                color: '#10b981'
            })
        ]
    ),
    c(
        '.mc-anchor-link-title',
        {
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: '4px',
            transition: 'background 0.2s, color 0.2s',
            padding: '4px 8px'
        },
        [
            c('&:hover', {
                color: '#10b981'
            })
        ]
    ),
    c(
        '.mc-anchor-indicator',
        {
            position: 'absolute',
            width: '4px',
            height: '100%',
            top: 0,
            left: 0
        },
        [
            c('&-track', {
                width: '100%',
                height: '100%',
                background: '#f0f0f0',
                borderRadius: '4px'
            }),
            c('&-marker', {
                position: 'absolute',
                width: '100%',
                height: '21px',
                left: 0,
                background: '#10b981',
                transition: 'top 0.2s',
                borderRadius: '4px'
            })
        ]
    )
]);
