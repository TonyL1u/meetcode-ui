import { c } from '../../_utils_';

export default c([
    c('.mc-message-global-container', {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        zIndex: 6000
    }),
    c(
        '.mc-message',
        {
            padding: '8px',
            borderRadius: '4px',
            lineHeight: 1,
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            transition: 'all 0.3s ease'
        },
        [
            c('&--loading', [
                c('.mc-message__icon-loading', {
                    display: 'inline-block',
                    marginRight: '8px',
                    borderRadius: '50%',
                    width: '14px',
                    height: '14px',
                    animation: 'mc-message-icon-loading-spin 1.2s linear infinite'
                })
            ]),
            c(
                '&--card',
                {
                    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)',
                    padding: '12px'
                },
                [
                    c('.mc-message__icon', {
                        marginRight: '8px'
                    })
                ]
            ),
            c('&__icon', {
                marginRight: '6px'
            }),
            c('&__content', {
                flex: 1
            }),
            c('&__close', {
                cursor: 'pointer',
                marginLeft: '4px'
            })
        ]
    ),
    c('.mc-message-slide-down-enter-from, .mc-message-slide-down-leave-to', {
        opacity: 0,
        transform: 'translateY(-30px)'
    }),
    c('.mc-message-slide-down-leave-active', {
        position: 'absolute'
    }),
    c('@keyframes mc-message-icon-loading-spin', {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
]);
