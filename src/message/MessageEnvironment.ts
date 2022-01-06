import { createVNode, TransitionGroup, defineComponent, ref } from 'vue';
import MessageEntity from './Message';
import MessageReactiveList, { closeMessage } from './MessageComposable';
import { MessageExposeInstance, Message } from './interface';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import _ from 'lodash-es';

const beforeEnter = (el: HTMLElement) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-30px)';
};

const enter = (el: HTMLElement, done: () => void) => {
    // gsap.to(el, {
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.3,
    //     onComplete: done
    // });
    const from = { autoAlpha: 0, y: -30 };
    const to = { autoAlpha: 1, y: 0, duration: 0.3 };
    gsap.fromTo(el, from, {
        ...to,
        onComplete: done
    });
};

const leave = (el: HTMLElement, done: () => void) => {
    // if (MessageReactiveList.length > 0) {
    //     // closeMessage(MessageReactiveList[0].key);
    //     move(MessageReactiveList[0].options.el!, -42);
    // }

    // gsap.to(el, {
    //     opacity: 0,
    //     y: -30,
    //     duration: 0.3,
    //     onComplete: () => {
    //         done();
    //     }
    // });

    const from = { autoAlpha: 1, y: 0 };
    const to = { autoAlpha: 0, y: -30, duration: 0.3 };
    gsap.fromTo(el, from, {
        ...to,
        onComplete: done
    });
    console.log(MessageReactiveList);
};

const move = (el: HTMLElement, y: number) => {
    gsap.to(el, {
        y,
        duration: 0.3,
        onComplete: () => {
            el.style.transform = 'translateY(0px)';
        }
    });
};
export default defineComponent({
    setup() {
        const getMessageEntityVNode = (message: Message) => {
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
                    //if destructure message, message can't be reactive
                    default: () => {
                        const content = message.options.message;
                        return typeof content === 'string' ? content : content?.();
                    }
                }
            );
        };

        return () =>
            createVNode(
                TransitionGroup,
                {
                    // name: 'mc-message-slide-down',
                    class: 'mc-message-global-container',
                    appear: true,
                    css: false,
                    tag: 'div',
                    // onBeforeEnter: beforeEnter,
                    onEnter: enter,
                    // onBeforeLeave: beforeLeave,
                    onLeave: leave
                },
                { default: () => MessageReactiveList.map(message => getMessageEntityVNode(message)) }
            );
    }
});
