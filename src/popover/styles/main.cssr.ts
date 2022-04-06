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
                width: 'calc(8px * 1.414)',
                height: 'calc(8px * 1.414)',
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
            c('& > .mc-popover--with-arrow', {
                marginBottom: '10px'
            }),
            c('& > .mc-popover__arrow', {
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                bottom: 'calc(-8px * 1.414)'
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
            c('& > .mc-popover--with-arrow', {
                marginLeft: '10px'
            }),
            c('& > .mc-popover__arrow', {
                clipPath: 'polygon(50% 50%, 100% 100%, 100% 0)',
                left: 'calc(-8px * 1.414)'
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
            c('& > .mc-popover--with-arrow', {
                marginBottom: '10px'
            }),
            c('& > .mc-popover__arrow', {
                clipPath: 'polygon(50% 50%, 0 100%, 100% 100%)',
                top: 'calc(-8px * 1.414)'
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
            c('& > .mc-popover--with-arrow', {
                marginRight: '10px'
            }),
            c('& > .mc-popover__arrow', {
                clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
                right: 'calc(-8px * 1.414)'
            })
        ]
    ),
    c("[v-placement='top-start'], [v-placement='bottom-start']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-x': '10px',
                '-webkit-transform-origin-x': '10px'
            },
            [
                c('& > .mc-popover__arrow', {
                    left: '10px'
                })
            ]
        )
    ]),
    c("[v-placement='top'], [v-placement='bottom']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-x': '50%',
                '-webkit-transform-origin-x': '50%'
            },
            [
                c('& > .mc-popover__arrow', {
                    left: '50%',
                    transform: 'translateX(-50%)'
                })
            ]
        )
    ]),
    c("[v-placement='top-end'], [v-placement='bottom-end']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-x': 'calc(100% - 10px)',
                '-webkit-transform-origin-x': 'calc(100% - 10px)'
            },
            [
                c('& > .mc-popover__arrow', {
                    right: '10px'
                })
            ]
        )
    ]),
    c("[v-placement='right-start'], [v-placement='left-start']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-y': '10px',
                '-webkit-transform-origin-y': '10px'
            },
            [
                c('& > .mc-popover__arrow', {
                    top: '10px'
                })
            ]
        )
    ]),
    c("[v-placement='right'], [v-placement='left']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-y': '50%',
                '-webkit-transform-origin-y': '50%'
            },
            [
                c('& > .mc-popover__arrow', {
                    top: '50%',
                    transform: 'translateY(-50%)'
                })
            ]
        )
    ]),
    c("[v-placement='right-end'], [v-placement='left-end']", [
        c(
            '& > .mc-popover',
            {
                '-ms-transform-origin-y': 'calc(100% - 10px)',
                '-webkit-transform-origin-y': 'calc(100% - 10px)'
            },
            [
                c('& > .mc-popover__arrow', {
                    bottom: '10px'
                })
            ]
        )
    ])
]);
