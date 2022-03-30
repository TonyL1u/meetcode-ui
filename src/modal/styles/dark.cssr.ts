import { c } from '../../_utils_';

export default c([
    c('.mc-modal-container', {
        position: 'fixed',
        height: 0,
        zIndex: 5000
    }),
    c('.mc-modal-mask', {
        backgroundColor: '#00000073'
    }),
    c('.mc-modal-wrapper', {
        display: 'flex',
        overflow: 'auto'
    }),
    c('.mc-modal-mask, .mc-modal-wrapper', {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms'
    }),
    c(
        '.mc-modal',
        {
            width: 'var(--modal-width)',
            height: 'var(--modal-height)',
            background: '#313540',
            color: '#fff',
            alignSelf: 'center',
            minWidth: 'max-content'
        },
        [
            c(
                '&:not(.mc-modal--pure)',
                {
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px'
                },
                [
                    c('.mc-modal-title', {
                        fontSize: '18px',
                        fontWeight: 500
                    }),
                    c('.mc-modal-close-icon', {
                        cursor: 'pointer',
                        color: '#fff'
                    }),
                    c('.mc-modal__header', {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 20px'
                    }),
                    c('.mc-modal__body', {
                        padding: '20px',
                        flex: 1
                    }),
                    c(
                        '.mc-modal__footer',
                        {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            padding: '12px 20px'
                        },
                        [
                            c('&-button:nth-child(1)', {
                                marginRight: '16px'
                            })
                        ]
                    )
                ]
            )
        ]
    ),
    c('.mc-modal-mask-fade-enter-from, .mc-modal-mask-fade-leave-to', {
        opacity: 0
    }),
    c('.mc-modal-scale-enter-from, .mc-modal-scale-leave-to', {
        opacity: 0,
        transform: 'scale(0.75)'
    }),
    c('.mc-modal-slide-enter-from, .mc-modal-slide-leave-to', {
        opacity: 0,
        transform: 'translateY(-36px)'
    })
]);
