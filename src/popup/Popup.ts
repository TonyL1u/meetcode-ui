import { render, createVNode, ref, Component, FunctionalComponent, isRef, defineComponent, Fragment } from 'vue';
import type { ObjectEmitsOptions } from 'vue';
import { PopupSourceOptions, PopupInstance, PopupModalConfig } from './interface';
import { McModal, ModalExposeInstance } from '../modal';

function McPopup<P extends Record<string, any>, E extends ObjectEmitsOptions>(source: Component | string, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    const PopupHostElement = document.createElement('div');
    const instance = ref<ModalExposeInstance>();
    const visible = ref(false);
    const rootVNode: FunctionalComponent = (props: PopupModalConfig = {}) => {
        const { footer, header } = props.slots ?? {};

        return createVNode(
            McModal,
            {
                ref: instance,
                ...props,
                show: visible.value,
                'onUpdate:show': (value: boolean) => {
                    visible.value = value;
                    props['onUpdate:show']?.(value);
                },
                appearFromCursor: props.appearFromCursor || false
            },
            {
                header,
                default: () => {
                    const { props: sourceProps = {}, on: sourceEmits = {} } = options;
                    const props: Record<string, any> = {};
                    const events: ObjectEmitsOptions = {};
                    for (const [name, handler] of Object.entries(sourceEmits as E)) {
                        events[`on${name.charAt(0).toUpperCase()}${name.slice(1)}`] = handler;
                    }
                    for (const [name, value] of Object.entries(sourceProps)) {
                        props[name] = isRef(value) ? value.value : value;
                    }

                    return createVNode(typeof source === 'string' ? defineComponent({ template: source }) : source, { ...props, ...events });
                },
                footer
            }
        );
    };

    return {
        show(config = {}) {
            visible.value = true;
            render(createVNode(rootVNode, { ...config }), PopupHostElement);
        },
        hide() {
            instance.value?.hide();
        },
        instance
    };
}

export default McPopup;
