import { c } from '../../_utils_';

export default c([
    c('.mc-checkbox', [
        c(
            '&--disabled',
            {
                color: '#bbb'
            },
            [
                c('.mc-checkbox__label, .mc-checkbox__label:hover', {
                    background: 'rgba(0, 0, 0, 0.02)'
                }),
                c('.mc-checkbox__label span:first-child svg', {
                    stroke: '#cccfdb'
                })
            ]
        )
    ]),
    c('.mc-checkbox__label', [
        c(
            '& > span:first-child',
            {
                border: '1px solid #cccfdb'
            },
            [
                c('svg', {
                    stroke: '#fff'
                })
            ]
        )
    ])
]);
