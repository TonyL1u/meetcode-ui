import { c } from '../../_utils_';

export default c(
    '.mc-message',
    {
        background: '#fff'
    },
    [
        c(
            '&--text',
            {
                background: '#eff6ff',
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
                background: '#ecfdf5',
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
                background: '#fffbeb',
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
                background: '#f9fafb',
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
                background: '#fef2f2',
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
            background: '#fff',
            border: 'none'
        })
    ]
);
