import { c } from '../../_utils_';

export default c([
    c(
        '.mc-text-link',
        {
            color: 'var(--text-link-default-color)',
            cursor: 'pointer',
            textDecoration: 'none'
        },
        [
            c('&:hover', {
                color: 'var(--text-link-hover-color)'
            }),
            c('&--block', {
                display: 'block',
                width: 'max-content'
            }),
            c('&.underline, &.underline-hover:hover', {
                textDecoration: 'underline'
            })
        ]
    )
]);
