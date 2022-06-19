import { c } from '../../_utils_';

export default c([
    c(
        '.mc-checkbox',
        {
            boxSizing: 'border-box',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'row wrap',
            position: 'relative'
        },
        [
            c('*', {
                boxSizing: 'border-box'
            }),
            c('&--disabled', [
                c('*', {
                    cursor: 'not-allowed'
                })
            ])
        ]
    ),
    c(
        '.mc-checkbox__input',
        {
            display: 'none'
        },
        [
            c(
                '&:checked + .mc-checkbox__label > span:first-child',
                {
                    background: 'var(--checkbox-checked-color)',
                    borderColor: 'var(--checkbox-checked-color)',
                    animation: 'zoom-in-out 0.2s ease'
                },
                [
                    c('svg', {
                        strokeDashoffset: 0
                    })
                ]
            )
        ]
    ),
    c(
        '.mc-checkbox__label',
        {
            userSelect: 'none',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '6px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center'
        },
        [
            c('&:not(:last-child)', {
                marginRight: '6px'
            }),
            c('&:hover', {
                background: 'var(--checkbox-hover-color)'
            }),
            c('& > span', {
                verticalAlign: 'middle',
                transform: 'translate3d(0, 0, 0)'
            }),
            c(
                '& > span:first-child',
                {
                    position: 'relative',
                    flex: '0 0 18px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    transform: 'var(--checkbox-scale-size)',
                    transition: 'all 0.2s ease'
                },
                [
                    c('svg', {
                        position: 'absolute',
                        top: '3px',
                        left: '2px',
                        fill: 'none',
                        strokeDasharray: '16px',
                        strokeDashoffset: '16px',
                        transition: 'all 0.2s ease',
                        transform: 'translate3d(0, 0, 0)'
                    })
                ]
            ),
            c('& > span:last-child', {
                paddingLeft: '8px',
                lineHeight: '18px'
            }),
            c('&:hover > span:first-child', {
                borderColor: 'var(--checkbox-checked-color)'
            })
        ]
    )
]);
