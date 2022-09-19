import { c } from '../../_utils_';

export default c([
    c(
        '.mc-progress',
        {
            overflow: 'hidden',
            position: 'relative'
        },
        [
            c('&--line', {
                width: '100%',
                display: 'flex',
                alignItems: 'center'
            }),
            c('&--circle', {
                width: 'var(--progress-circle-size)',
                height: 'var(--progress-circle-size)',
                display: 'inline-flex'
            })
        ]
    ),
    c(
        '.mc-progress--line .mc-progress-graph',
        {
            height: 'var(--progress-line-height)',
            width: '100%',
            borderRadius: 'var(--progress-line-height)',
            flex: 1,
            transition: 'background-color 0.2s',
            overflow: 'hidden'
        },
        [
            c('.mc-progress-graph-inner', {
                height: '100%',
                width: 'var(--progress-width)',
                minWidth: '0%',
                maxWidth: '100%',
                borderRadius: 'var(--progress-line-height)',
                transition: 'width var(--progress-inner-transition), background-color 0.2s'
            })
        ]
    ),
    c('.mc-progress--line', [
        c(
            '.mc-progress-indicator',
            {
                height: '100%',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                lineHeight: 1
            },
            [
                c('&.outside', {
                    color: 'var(--progress-indicator-color, inherit)',
                    marginLeft: '8px'
                }),
                c('&.inside', {
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0 8px'
                })
            ]
        )
    ]),
    c(
        '.mc-progress--circle .mc-progress-graph',
        {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        [
            c('.mc-progress-graph-outer', {
                transition: 'stroke 0.2s'
            }),
            c('.mc-progress-graph-inner', {
                transition: 'stroke-dasharray var(--progress-inner-transition), stroke 0.2s, stroke-opacity 0.2s'
            }),
            c('.mc-progress-indicator', {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'var(--progress-indicator-color, inherit)'
            })
        ]
    )
]);
