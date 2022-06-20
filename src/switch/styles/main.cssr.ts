import { c } from '../../_utils_';

export default c([
    c(
        '.mc-switch__label',
        {
            position: 'relative',
            display: 'inline-block',
            width: '40px',
            height: '20px',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '20px',
            transition: 'all 0.2s'
        },
        [
            c('&:after', {
                content: "''",
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '18px',
                background: '#fff',
                top: '1px',
                left: '1px',
                transition: 'all 0.2s'
            })
        ]
    ),
    c(
        '.mc-switch__input',
        {
            position: 'absolute',
            left: '-9999px'
        },
        [
            c('&:checked + .mc-switch__label', {
                background: '#7983ff'
            }),
            c('&:checked + .mc-switch__label:after', {
                transform: 'translateX(20px)'
            })
        ]
    )
]);
