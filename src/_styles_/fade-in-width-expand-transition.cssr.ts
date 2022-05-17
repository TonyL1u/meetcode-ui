import { c } from '../_utils_';

export default c([
    c('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
        opacity: 1
    }),
    c(
        '&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from',
        `
        opacity: 0!important;
        margin-left: 0!important;
        margin-right: 0!important;
      `
    )
]);
