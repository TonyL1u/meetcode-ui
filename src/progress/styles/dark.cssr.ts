import { c } from '../../_utils_';

export default c([
    c(
        '.mc-progress--line .mc-progress-graph',
        {
            background: 'var(--progress-track-color, rgba(255, 255, 255, 0.12))'
        },
        [
            c('.mc-progress-graph-inner', {
                background: 'var(--progress-color, #059669)'
            })
        ]
    ),
    c('.mc-progress--line', [
        c('.mc-progress-indicator', [
            c('&.inside', {
                color: 'var(--progress-indicator-color, #000)'
            })
        ])
    ]),
    c('.mc-progress--circle .mc-progress-graph', [
        c('.mc-progress-graph-outer', {
            stroke: 'var(--progress-track-color, rgba(255, 255, 255, 0.12))'
        }),
        c('.mc-progress-graph-inner', {
            stroke: 'var(--progress-color, #059669)'
        })
    ])
]);
