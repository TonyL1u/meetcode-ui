import { createVNode, render } from 'vue';

const Message = () => {
    const container = document.createElement('div');
    const vnode = createVNode(MessageContainer);
    render(vnode, container);
};

export { Message };
