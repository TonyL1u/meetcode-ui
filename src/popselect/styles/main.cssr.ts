import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c(
        '.mc-popselect-option',
        {
            padding: '7.5px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color .2s'
        },
        [
            c('&:not(:last-child)', {
                marginBottom: '4px'
            }),
            c('&--disabled', {
                cursor: 'not-allowed'
            }),
            c(
                '&__inner',
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                [
                    c('& > div.truncate', {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 'var(--popselect-inner-max-width)'
                    })
                ]
            )
        ]
    )
]);
