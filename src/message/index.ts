// export { default as McMessage } from './Message.vue';
import { render, ref, watch, createVNode } from 'vue';
import { MessageGlobalContainer } from './interface';
import MessageInstance from './MessageInstance';
import MessageContainer from './MessageContainer.vue';
import './style.scss';

render(createVNode(MessageContainer), MessageGlobalContainer);
document.body.appendChild(MessageGlobalContainer);
