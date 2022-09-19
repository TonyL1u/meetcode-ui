import { c } from '../../_utils_';

export default c(
    '.mc-message',
    {
        background: '#313540',
        color: '#eee'
    },
    [
        c(
            '&--text',
            {
                border: '1px solid #3b82f6'
            },
            [
                c('.mc-message__icon', {
                    color: '#3b82f6'
                })
            ]
        ),
        c(
            '&--success',
            {
                border: '1px solid #10b981'
            },
            [
                c('.mc-message__icon', {
                    color: '#10b981'
                })
            ]
        ),
        c(
            '&--warning',
            {
                border: '1px solid #f59e0b'
            },
            [
                c('.mc-message__icon', {
                    color: '#f59e0b'
                })
            ]
        ),
        c(
            '&--info',
            {
                border: '1px solid #6b7280'
            },
            [
                c('.mc-message__icon', {
                    color: '#6b7280'
                })
            ]
        ),
        c(
            '&--error',
            {
                border: '1px solid #ef4444'
            },
            [
                c('.mc-message__icon', {
                    color: '#ef4444'
                })
            ]
        ),
        c(
            '&--loading',
            {
                border: '1px solid #10b981'
            },
            [
                c('.mc-message__icon-loading', {
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    borderLeftColor: '#10b981'
                })
            ]
        ),
        c('&--card', {
            border: 'none'
        })
    ]
);
