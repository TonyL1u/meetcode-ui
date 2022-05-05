import { render, createVNode, ref, Component, FunctionalComponent, isRef, defineComponent, VNodeChild } from 'vue';
import { PopupSourceOptions, PopupInstance, PopupModalConfig, PopupDrawerConfig, PopupType } from './interface';
import { McModal } from '../modal';
import { McDrawer } from '../drawer';
import type { ObjectEmitsOptions } from 'vue';
import type { ModalExposeInstance } from '../modal';
import type { DrawerExposeInstance } from '../drawer';

function McPopup<P extends Record<string, any>, E extends ObjectEmitsOptions>(source: Component | string, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    const PopupHostElement = document.createElement('div');
    const instance = ref<ModalExposeInstance | DrawerExposeInstance>();
    const visible = ref(false);
    const modalVNode: FunctionalComponent<PopupModalConfig> = (props = {}, ctx) => {
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
    const drawerVNode: FunctionalComponent<PopupDrawerConfig> = props => {
        const { header } = props.slots ?? {};

        return createVNode(
            McDrawer,
            {
                ref: instance,
                ...props,
                show: visible.value,
                'onUpdate:show': (value: boolean) => {
                    visible.value = value;
                    props['onUpdate:show']?.(value);
                }
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
                }
            }
        );
    };

    return {
        show<T extends PopupType = 'modal'>(maybePopupConfig?: T | PopupModalConfig, config: PopupModalConfig | PopupDrawerConfig = {}) {
            visible.value = true;
            if (typeof maybePopupConfig === 'string') {
                render(createVNode(maybePopupConfig === 'modal' ? modalVNode : drawerVNode, { ...config }), PopupHostElement);
            } else {
                render(createVNode(modalVNode, { ...(maybePopupConfig || {}) }), PopupHostElement);
            }
        },
        hide() {
            instance.value?.hide();
        },
        instance
    };
}

export default McPopup;
