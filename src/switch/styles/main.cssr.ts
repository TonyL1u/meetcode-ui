import { c } from '../../_utils_';

export default c([
    c(
        '.mc-switch',
        {
            display: 'inline-flex',
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            lineHeight: '22px'
        },
        [
            c('&--disabled', {
                opacity: 0.4,
                cursor: 'not-allowed'
            }),
            c(
                '&--checked > &-label',
                {
                    animation: 'mc-switch-border-ripple-out 0.5s'
                },
                [
                    c('span', {
                        padding: '0px 26px 0px 10px'
                    }),
                    c('.mc-switch-label__handler', {
                        transform: 'translateX(-100%)',
                        left: 'calc(100% - 2px)'
                    })
                ]
            )
        ]
    ),
    c(
        '.mc-switch-label',
        {
            cursor: 'inherit',
            position: 'relative',
            minWidth: '44px',
            height: '22px',
            borderRadius: 'var(--switch-label-border-radius)',
            transition: 'all 0.2s'
        },
        [
            c('&-text--left, &-text--right', {
                transition: 'color 0.2s'
            }),
            c('&-text--left', {
                marginRight: '6px'
            }),
            c('&-text--right', {
                marginLeft: '6px'
            }),
            c('&__content', {
                padding: '0px 10px 0px 26px',
                width: '100%',
                transition: 'all 0.2s',
                display: 'flex',
                boxSizing: 'border-box'
            }),
            c('&__handler', {
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: 'var(--switch-label-handler-border-radius)',
                top: '2px',
                left: '2px',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }),
            c('&:active &__handler', {
                width: '22px'
            })
        ]
    ),
    c(
        '.mc-switch-input',
        {
            opacity: 0,
            width: 0,
            margin: 0
        },
        [
            // c(
            //     '&:checked ~ .mc-switch-label',
            //     {
            //         animation: 'mc-switch-border-ripple-out 0.5s'
            //     },
            //     [
            //         c('span', {
            //             padding: '0px 26px 0px 10px'
            //         }),
            //         c('.mc-switch-label__handler', {
            //             transform: 'translateX(-100%)',
            //             left: 'calc(100% - 2px)'
            //         })
            //     ]
            // )
        ]
    ),
    c('@keyframes mc-switch-border-ripple-out', {
        from: {
            boxShadow: '0 0 0.5px 0 #15803d'
        },
        to: {
            boxShadow: '0 0 0.5px 4px #15803d00'
        }
    })
]);
