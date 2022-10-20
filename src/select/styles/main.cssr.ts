import { c } from '../../_utils_';

export default c([
    c('.mc-select', [
        c('&.mc-select--filterable *', {
            cursor: 'pointer'
        }),
        c(
            '&:not(.mc-select--filterable) .mc-select-wrapper',
            {
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            [
                c('&::after', {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: '3px',
                    border: '1px solid #e0e0e6',
                    pointerEvents: 'none',
                    transition: '0.2s'
                }),
                c('&:hover::after', {
                    borderColor: '#10b981'
                })
            ]
        ),
        c(
            '&:not(.mc-select--filterable)',
            {
                height: '32px',
                position: 'relative',
                padding: '0 12px',
                cursor: 'pointer'
            },
            [
                c('&.mc-select--focused .mc-select-wrapper::after', {
                    borderColor: '#10b981'
                }),
                c('&.mc-select--focused .mc-select-wrapper::after', {
                    boxShadow: '0 0 0.5px 1.5px rgba(16, 185, 129, 0.4)'
                }),
                c('.mc-select__placeholder', {
                    color: '#bbb'
                }),
                c('.mc-select__arrow, .mc-select__clear', {
                    marginLeft: '4px'
                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)'
                })
            ]
        ),
        c('.mc-select__arrow', {
            transition: '0.2s'
        }),
        c('&--active &__arrow', {
            transform: 'rotate(-180deg)'
        })
    ])
]);
