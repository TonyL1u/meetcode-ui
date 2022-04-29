import { render, createVNode, ref, Component, FunctionalComponent } from 'vue';
import type { ObjectEmitsOptions } from 'vue';
import { PopupSourceOptions, PopupInstance, PopupModalConfig } from './interface';
import { McModal, ModalExposeInstance } from '../modal';

function McPopup<P extends Record<string, any>, E extends ObjectEmitsOptions>(source: Component, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    const instance = ref<ModalExposeInstance>();
    const visible = ref(false);
    const rootVNode: FunctionalComponent = (props: PopupModalConfig = {}) => {
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
                appearFromCursor: false,
                onAfterLeave: () => {
                    render(null, document.body);
                    props.onAfterLeave?.();
                }
            },
            {
                default: () => {
                    const { props: sourceProps = {}, on: sourceEmit = {} } = options;
                    const events: ObjectEmitsOptions = {};
                    for (const [name, handler] of Object.entries(sourceEmit as E)) {
                        events[`on${name.charAt(0).toUpperCase()}${name.slice(1)}`] = handler;
                    }

                    return createVNode(source, { ...sourceProps, ...events });
                }
            }
        );
    };

    return {
        show(config = {}) {
            visible.value = true;
            render(createVNode(rootVNode, { ...config }), document.body);
        },
        hide() {
            instance.value?.hide();
        },
        instance
    };
}

export default McPopup;
