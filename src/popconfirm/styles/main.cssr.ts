import { c } from '../../_utils_';

export default c('.mc-popconfirm', [
    c('&__content', {
        display: 'flex',
        alignItems: 'center',
        minWidth: '110px'
    }),
    c('&__action', {
        display: 'flex',
        justifyContent: 'end',
        marginTop: '8px'
    })
]);
