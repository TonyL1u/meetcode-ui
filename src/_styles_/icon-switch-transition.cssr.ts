import { CssRender } from 'css-render';

const { c } = CssRender();

export default c([
    c('&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to', {
        transform: 'scale(0.75)',
        opacity: 0
    }),
    c('&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from', {
        transform: `scale(1)`,
        opacity: 1
    }),
    c('&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active', {
        transformOrigin: 'center',
        position: 'absolute',
        transition: `all 0.2s cubic-bezier(.4, 0, .2, 1) !important`
    })
]);
