import { c } from '../../_utils_';

export default c([
    c('.mc-menu, .mc-menu-item-group, .mc-sub-menu', {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }),
    c('.mc-menu-item', {
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '4px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s',
        paddingRight: '16px'
    }),
    c('.mc-menu-item-group', [
        c('&-title', {
            height: '32px',
            paddingRight: '16px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: 'rgb(118, 124, 130)'
        }),
        c('&-children', {
            padding: 0
        })
    ]),
    c(
        '.mc-sub-menu',
        {
            marginBottom: '4px'
        },
        [
            c('&--collapsed > .mc-sub-menu-title', [
                c('.mc-sub-menu-title__arrow', {
                    transform: 'rotate(-180deg)'
                })
            ]),
            c('&--child-active > .mc-sub-menu-title', {
                color: '#10b981'
            }),
            c(
                '&-title',
                {
                    height: '40px',
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s'
                },
                [
                    c('&__icon', {
                        display: 'flex',
                        marginRight: '8px'
                    }),
                    c('&__content', {
                        flex: 1
                    }),
                    c('&__arrow', {
                        transition: '0.2s'
                    })
                ]
            ),
            c('&-children', {
                transition: '0.2s',
                padding: 0,
                marginTop: '4px'
            })
        ]
    )
]);
