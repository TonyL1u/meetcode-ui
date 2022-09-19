import { CssRender } from 'css-render';

const { c } = CssRender();

export default c([
    c(`&.fade-in-height-expand-transition-leave-from, &.fade-in-height-expand-transition-enter-to`, {
        opacity: 1
    }),
    c(`&.fade-in-height-expand-transition-leave-to, &.fade-in-height-expand-transition-enter-from`, {
        opacity: 0,
        marginTop: '0 !important',
        marginBottom: '0 !important',
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    })
]);
