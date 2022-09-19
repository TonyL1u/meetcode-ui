import { c } from '../../_utils_';

export default c([
    c(
        '.mc-message-global-container',
        {
            position: 'fixed',

            height: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            zIndex: 6000
        },
        [
            c(
                '&[v-placement^="top"]',
                {
                    top: '0',
                    justifyContent: 'flex-start'
                },
                [
                    c('.mc-message-slide-down-enter-from, .mc-message-slide-down-leave-to', {
                        transform: 'translateY(-30px)'
                    })
                ]
            ),
            c(
                '&[v-placement^="middle"]',
                {
                    top: '50%',
                    justifyContent: 'center'
                },
                [
                    c('.mc-message:first-child', { marginTop: 0 }),
                    c('.mc-message-slide-down-enter-from, .mc-message-slide-down-leave-to', {
                        transform: 'translateY(0px)'
                    })
                ]
            ),
            c(
                '&[v-placement^="bottom"]',
                {
                    bottom: '8px',
                    justifyContent: 'flex-end'
                },
                [
                    c('.mc-message-slide-down-enter-from, .mc-message-slide-down-leave-to', {
                        transform: 'translateY(30px)'
                    })
                ]
            ),
            c('&[v-placement$="left"]', {
                left: '8px',
                alignItems: 'flex-start'
            }),
            c('&[v-placement$="center"]', {
                alignItems: 'center'
            }),
            c('&[v-placement$="right"]', {
                right: '8px',
                alignItems: 'flex-end'
            })
        ]
    ),
    c(
        '.mc-message',
        {
            padding: '8px',
            borderRadius: '4px',
            lineHeight: 1,
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            marginTop: 'var(--message-item-gap)',
            transition: 'all 0.3s ease'
        },
        [
            // c('&:not(:first-child)', {
            //     marginTop: 'var(--message-item-gap)'
            // }),
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
        opacity: 0
    }),
    c('.mc-message-slide-down-leave-active', {
        position: 'absolute'
    })
]);
