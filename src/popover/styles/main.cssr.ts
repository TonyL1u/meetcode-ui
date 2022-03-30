import { c } from '../../_utils_';

export default c([
    c(
        '.mc-popover',
        {
            padding: '8px 12px',
            borderRadius: '4px',
            position: 'relative',
            top: 'var(--popover-offset-top)',
            right: 'var(--popover-offset-right)',
            bottom: 'var(--popover-offset-bottom)',
            left: 'var(--popover-offset-left)',
            boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.125s linear'
        },
        [
            c('&__title', {
                fontWeight: 'bold',
                marginBottom: '4px',
                fontSize: '16px',
                lineHeight: '24px'
            }),
            c('&__arrow', {
                width: '8px',
                height: '8px',
                position: 'absolute',
                transformOrigin: '50% 50%',
                background: 'inherit',
                display: 'inline-block'
            })
        ]
    ),
    c('.mc-popover-fade-enter-from, .mc-popover-fade-leave-to', {
        opacity: 0,
        transform: 'scale(0.75)'
    }),
    c(
        "[v-placement^='top'] > .mc-popover",
        {
            '-ms-transform-origin-y': '100%',
            '-webkit-transform-origin-y': '100%',
            marginBottom: '8px'
        },
        [
            c('.mc-popover--with-arrow', {
                marginBottom: '10px'
            }),
            c('.mc-popover__arrow', {
                transform: 'translateX(-50%) rotate(45deg)',
                bottom: '-4px'
            })
        ]
    ),
    c(
        "[v-placement^='right'] > .mc-popover",
        {
            '-ms-transform-origin-x': '0%',
            '-webkit-transform-origin-x': '0%',
            marginLeft: '8px'
        },
        [
            c('.mc-popover--with-arrow', {
                marginLeft: '10px'
            }),
            c('.mc-popover__arrow', {
                transform: 'translateY(-50%) rotate(45deg)',
                left: '-4px'
            })
        ]
    ),
    c(
        "[v-placement^='bottom'] > .mc-popover",
        {
            '-ms-transform-origin-y': '0%',
            '-webkit-transform-origin-y': '0%',
            marginTop: '8px'
        },
        [
            c('.mc-popover--with-arrow', {
                marginBottom: '10px'
            }),
            c('.mc-popover__arrow', {
                transform: 'translateX(-50%) rotate(45deg)',
                top: '-4px'
            })
        ]
    ),
    c(
        "[v-placement^='left'] > .mc-popover",
        {
            '-ms-transform-origin-x': '100%',
            '-webkit-transform-origin-x': '100%',
            marginRight: '8px'
        },
        [
            c('.mc-popover--with-arrow', {
                marginRight: '10px'
            }),
            c('.mc-popover__arrow', {
                transform: 'translateY(-50%) rotate(45deg)',
                right: '-4px'
            })
        ]
    ),
    c("[v-placement='top-start'], [v-placement='bottom-start']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-x': '15%',
                '-webkit-transform-origin-x': '15%'
            },
            [
                c('.mc-popover__arrow', {
                    left: '15%'
                })
            ]
        )
    ]),
    c("[v-placement='top'], [v-placement='bottom']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-x': '50%',
                '-webkit-transform-origin-x': '50%'
            },
            [
                c('.mc-popover__arrow', {
                    left: '50%'
                })
            ]
        )
    ]),
    c("[v-placement='top-end'], [v-placement='bottom-end']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-x': '85%',
                '-webkit-transform-origin-x': '85%'
            },
            [
                c('.mc-popover__arrow', {
                    left: '85%'
                })
            ]
        )
    ]),
    c("[v-placement='right-start'], [v-placement='left-start']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-y': '15%',
                '-webkit-transform-origin-y': '15%'
            },
            [
                c('.mc-popover__arrow', {
                    top: '15%'
                })
            ]
        )
    ]),
    c("[v-placement='right'], [v-placement='left']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-y': '50%',
                '-webkit-transform-origin-y': '50%'
            },
            [
                c('.mc-popover__arrow', {
                    top: '50%'
                })
            ]
        )
    ]),
    c("[v-placement='right-end'], [v-placement='left-end']", [
        c(
            '.mc-popover',
            {
                '-ms-transform-origin-y': '85%',
                '-webkit-transform-origin-y': '85%'
            },
            [
                c('.mc-popover__arrow', {
                    top: '85%'
                })
            ]
        )
    ])
]);
