import { CssRender } from 'css-render';

const { c } = CssRender();

export default c([
    c('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
        opacity: 1
    }),
    c('&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from', {
        opacity: '0 !important',
        marginLeft: '0 !important',
        marginRight: '0 !important'
    })
]);
