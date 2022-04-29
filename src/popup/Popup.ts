import { render, createVNode, ref, Component, toRefs, nextTick, FunctionalComponent } from 'vue';
import { useThemeRegister } from '../_utils_';
import { PopupApi, PopupOptions } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { McModal, ModalExposeInstance } from '../modal';

function McPopup<T>(source: Component, options: PopupOptions<T> = {}) {
    const { show = true, props, modalProps = {} } = options;
    const { title, showFooter } = modalProps;

    const instance = ref<ModalExposeInstance>();
    const visible = ref(show);
    const rootVNode: FunctionalComponent = () => {
        return createVNode(
            McModal,
            {
                ref: instance,
                show: visible.value,
                title,
                showFooter,
                'onUpdate:show': (value: boolean) => (visible.value = value),
                appearFromCursor: false,
                onAfterLeave: () => {
                    render(null, document.body);
                }
            },
            {
                default: () => createVNode(source)
            }
        );
    };
    if (show) render(createVNode(rootVNode), document.body);

    return {
        show() {
            visible.value = true;
            render(createVNode(rootVNode), document.body);
        },
        instance
    };
}

export default McPopup;
