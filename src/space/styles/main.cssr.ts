import { c } from '../../_utils_';

export default c(
    '.mc-space',
    {
        display: 'flex',
        flexDirection: 'var(--space-direction)' as any,
        justifyContent: 'var(--space-justify)',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    [c('&--vertical', { alignItems: 'flex-start' }), c('&-item', { padding: '4px 0', display: 'flex' }), c('&-item:not(:last-child)', { margin: 'var(--space-item-gap)' })]
);
