import { c } from '../../_utils_';

export default c('.mc-popselect', [
    c(
        '.mc-popselect-option',
        {
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
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
                    c('& > div', {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px'
                    })
                ]
            )
        ]
    )
]);
