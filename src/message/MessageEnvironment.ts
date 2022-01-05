import { createVNode, TransitionGroup, defineComponent } from 'vue';
import MessageEntity from './Message';
import MessageReactiveList, { closeMessage } from './MessageComposable';
import { MessageExposeInstance, Message } from './interface';

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
                        // message.options.close = close;
                        // message.options.el = el;
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

        return () => createVNode(TransitionGroup, { name: 'mc-message-slide-down', appear: true, tag: 'div', class: 'mc-message-global-container' }, { default: () => MessageReactiveList.map(message => getMessageEntityVNode(message)) });
    }
});
