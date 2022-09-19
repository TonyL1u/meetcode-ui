import { c } from '../../_utils_';

export default c([
    c(
        '.mc-switch',
        {
            display: 'inline-flex',
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            lineHeight: 'var(--switch-label-height)',
            fontSize: 'var(--switch-font-size)'
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
                    c('.mc-switch-label__content', {
                        padding: 'var(--switch-text-checked-padding)',
                        justifyContent: 'flex-start'
                    }),
                    c('.mc-switch-label__handler', {
                        left: '100%',
                        marginLeft: 'calc(-2px - var(--switch-handler-size))'
                    })
                ]
            ),
            c('&:not(&--inelastic)', [
                c('.mc-switch-label:active  .mc-switch-label__handler', {
                    width: 'calc(var(--switch-handler-size) + 4px)'
                })
            ]),
            c('&:not(&--inelastic).mc-switch--checked', [
                c('.mc-switch-label:active  .mc-switch-label__handler', {
                    marginLeft: 'calc(-6px - var(--switch-handler-size))'
                })
            ])
        ]
    ),
    c(
        '.mc-switch-label',
        {
            cursor: 'inherit',
            position: 'relative',
            width: 'var(--switch-label-width)',
            minWidth: 'var(--switch-label-min-width)',
            height: 'var(--switch-label-height)',
            borderRadius: 'var(--switch-label-border-radius)',
            transition: 'all 0.2s',
            userSelect: 'none'
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
                padding: 'var(--switch-text-unchecked-padding)',
                width: '100%',
                height: '100%',
                transition: 'all 0.2s',
                display: 'flex',
                boxSizing: 'border-box',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }),
            c('&__handler', {
                position: 'absolute',
                width: 'var(--switch-handler-size)',
                height: 'var(--switch-handler-size)',
                borderRadius: 'var(--switch-handler-border-radius)',
                top: '2px',
                left: '2px',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            })
        ]
    ),
    c('.mc-switch-input', {
        opacity: 0,
        width: 0,
        margin: 0,
        outline: 'none'
    }),
    c('@keyframes mc-switch-border-ripple-out', {
        from: {
            boxShadow: '0 0 0.5px 0 var(--switch-checked-color, #10b981)'
        },
        to: {
            boxShadow: '0 0 0.5px 4px var(--switch-ripple-color, #10b98100)'
        }
    })
]);
