import { createVNode, TransitionGroup, FunctionalComponent, nextTick } from 'vue';
import MessageEntity from './Message';
import MessageReactiveList, { closeMessage, unmountContainer } from './MessageComposable';
import { MessageExposeInstance, Message } from './interface';
// import gsap from 'gsap';
// import Flip from 'gsap/Flip';

// gsap.registerPlugin(Flip);
// const enter = (el: HTMLElement, done: () => void) => {
//     const to: gsap.TweenVars = { autoAlpha: 1, scale: 1, transformOrigin: '50% 0', duration: 0.3 };
//     gsap.fromTo(
//         el,
//         { autoAlpha: 0, scale: 0 },
//         {
//             ...to,
//             ease: 'power1.out',
//             onComplete: done
//         }
//     );
// };

// const leave = (el: HTMLElement, done: gsap.Callback) => {
//     if (MessageReactiveList.length === 0) {
//         exit(el, () => {
//             done();
//             requestAnimationFrame(() => {
//                 unmountContainer();
//             });
//         });
//     } else {
//         setState(() => el.classList.add('exiting'), done);
//     }
// };

// function setState(action: () => void, done?: gsap.Callback) {
//     const state = Flip.getState('.mc-message');
//     action();
//     Flip.from(state, {
//         duration: 0.3,
//         absolute: true,
//         scale: true,
//         onLeave(elements) {
//             return exit(elements);
//         },
//         onComplete: done
//     });
// }

// function exit(el: gsap.TweenTarget, done?: gsap.Callback) {
//     gsap.to(el, {
//         autoAlpha: 0,
//         scale: 0,
//         duration: 0.3,
//         transformOrigin: '50% 0',
//         onComplete: done
//     });
// }

function getMessageEntityVNode(message: Message, index: number) {
    const {
        key,
        type,
        options: { duration, className, style, closable, hoverAlive, html, card, itemGap, icon, action, onClose }
    } = message;

    return createVNode(
        MessageEntity,
        {
            key,
            ref: ins => {
                const { close, el } = (ins as MessageExposeInstance) ?? {};
                message.options.close = close;
                message.options.el = el;
            },
            type,
            duration,
            class: className,
            style,
            closable,
            hoverAlive,
            html,
            card,
            itemGap,
            icon,
            action,
            onClose: () => {
                onClose && onClose();
                closeMessage(key);
            }
        },
        {
            // if destructure message, message can't be reactive
            default: () => {
                const content = message.options.message;
                return typeof content === 'string' ? content : content?.();
            }
        }
    );
}

const MessageEnvironment: FunctionalComponent = () => {
    return createVNode(
        TransitionGroup,
        {
            name: 'mc-message-slide-down',
            class: 'mc-message-global-container',
            appear: true,
            // css: false,
            tag: 'div'
            // onEnter: enter,
            // onLeave: leave
        },
        { default: () => MessageReactiveList.map(getMessageEntityVNode) }
    );
};

export default MessageEnvironment;
