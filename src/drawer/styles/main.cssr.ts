import { c } from '../../_utils_';

export default c([
    c('.mc-drawer-container', {
        position: 'fixed',
        height: 0,
        zIndex: 5000
    }),
    c('.mc-drawer-mask', {
        backgroundColor: '#00000073'
    }),
    c('.mc-drawer-wrapper', {
        display: 'flex',
        overflow: 'auto'
    }),
    c('.mc-drawer-mask, .mc-drawer-wrapper', {
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
        '.mc-drawer',
        {
            width: 'var(--drawer-width)',
            height: 'var(--drawer-height)',
            minWidth: 'max-content'
        },
        [
            c(
                '&:not(.mc-drawer--pure)',
                {
                    display: 'flex',
                    flexDirection: 'column'
                },
                [
                    c('.mc-drawer-title', {
                        fontSize: '18px',
                        fontWeight: 500
                    }),
                    c('.mc-drawer-close-button', {
                        position: 'relative',
                        left: '8px'
                    }),
                    c('.mc-drawer__header', {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 20px'
                    }),
                    c('.mc-drawer__body', {
                        padding: '20px',
                        flex: 1,
                        overflow: 'auto'
                    })
                ]
            ),
            c('&--top', {
                marginBottom: 'auto',
                borderRadius: '0 0 8px 8px'
            }),
            c('&--right', {
                marginLeft: 'auto',
                borderRadius: '8px 0 0 8px'
            }),
            c('&--bottom', {
                marginTop: 'auto',
                borderRadius: '8px 8px 0 0'
            }),
            c('&--left', {
                marginRight: 'auto',
                borderRadius: '0 8px 8px 0'
            })
        ]
    ),
    c('.mc-drawer-mask-fade-enter-from, .mc-drawer-mask-fade-leave-to', {
        opacity: 0
    }),
    c('.mc-drawer-appear-top-enter-from, .mc-drawer-appear-top-leave-to', {
        transform: 'translateY(calc(0px - var(--drawer-size)))'
    }),
    c('.mc-drawer-appear-right-enter-from, .mc-drawer-appear-right-leave-to', {
        transform: 'translateX(var(--drawer-size))'
    }),
    c('.mc-drawer-appear-bottom-enter-from, .mc-drawer-appear-bottom-leave-to', {
        transform: 'translateY(var(--drawer-size))'
    }),
    c('.mc-drawer-appear-left-enter-from, .mc-drawer-appear-left-leave-to', {
        transform: 'translateX(calc(0px - var(--drawer-size)))'
    })
]);
