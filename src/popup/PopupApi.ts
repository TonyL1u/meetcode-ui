import { createVNode, render } from 'vue';
import { PopupApi } from './interface';
import Popup from './Popup';

const McPopup: PopupApi = {
    show() {
        render(createVNode(Popup), document.body);
    }
};

export default McPopup;
