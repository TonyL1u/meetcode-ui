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
            c('&:hover:not(&--active)', {
                background: 'rgb(243, 243, 245)'
            }),
            c('&--active', {
                background: '#f2fcf8',
                color: '#10b981'
            })
        ]
    ),
    c(
        '.mc-menu-item-group',
        // {
        //     paddingLeft: '32px'
        // },
        [
            c('.mc-menu-item', {
                paddingLeft: '48px'
            })
        ]
    )
]);
