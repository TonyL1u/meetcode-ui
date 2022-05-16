import { c } from '../../_utils_';

export default c([
    c('.mc-menu', {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }),
    c(
        '.mc-menu-item',
        {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px',
            cursor: 'pointer',
            borderRadius: '4px',
            paddingLeft: '32px',
            transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s'
        },
        [
            c('&:hover', {
                background: '#f2fcf8'
            }),
            c('&--active', {
                background: '#f2fcf8',
                color: '#10b981'
            })
        ]
    ),
    c(
        '.mc-menu-item-group',
        {
            // paddingLeft: '32px'
        },
        [
            c('&-title', {
                height: '32px',
                paddingLeft: '32px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                color: 'rgb(118, 124, 130)'
            }),
            c('&-children', {
                padding: 0
            }),
            c('.mc-menu-item', {
                paddingLeft: '48px'
            })
        ]
    ),
    c('.mc-sub-menu', {}, [
        c(
            '&-title',
            {
                height: '40px',
                paddingLeft: '32px',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '4px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s'
            },
            [
                c('&:hover', {
                    background: '#f2fcf8'
                })
            ]
        ),
        c('&-children', {
            transition: '0.2s',
            padding: 0
        }),
        c('.mc-menu-item', {
            paddingLeft: '48px'
        })
    ]),
    c('.mc-menu-expand-enter-from, .mc-menu-expand-leave-to', {
        opacity: 0
    })
]);
