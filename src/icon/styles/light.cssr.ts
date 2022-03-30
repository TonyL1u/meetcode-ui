import { c } from '../../_utils_';

export default c([
    c(
        '.mc-icon',
        {
            height: '1em',
            width: '1em',
            lineHeight: '1em',
            textAlign: 'center',
            display: 'inline-block',
            position: 'relative',
            fill: 'currentColor',
            transform: 'translateZ(0)',
            color: 'var(--icon-color)',
            fontSize: 'var(--icon-font-size)'
        },
        [
            c('&--spinning', {
                animation: 'mc-icon-spinning var(--icon-spinning-speed) linear infinite'
            })
        ]
    ),
    c('@keyframes mc-icon-spinning', {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
]);
