import { render, createVNode, ref, Component, FunctionalComponent, isRef, defineComponent, VNodeChild } from 'vue';
import { PopupSourceOptions, PopupInstance, PopupModalConfig, PopupDrawerConfig, PopupType } from './interface';
import { McModal } from '../modal';
import { McDrawer } from '../drawer';
import type { ObjectEmitsOptions } from 'vue';
import type { ModalExposeInstance } from '../modal';
import type { DrawerExposeInstance } from '../drawer';

function McPopup<P extends Record<string, any> = {}, E extends ObjectEmitsOptions = {}>(source: Component | string, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    const PopupHostElement = ref<HTMLDivElement | null>(document.createElement('div'));
    const instance = ref<ModalExposeInstance | DrawerExposeInstance | null>();
    const visible = ref(false);
    const createDefaultVNode = () => {
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
    };
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
                default: createDefaultVNode,
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
                default: createDefaultVNode
            }
        );
    };

    return {
        instance,
        show<T extends PopupType = 'modal'>(maybePopupConfig?: T | PopupModalConfig, config: PopupModalConfig | PopupDrawerConfig = {}) {
            visible.value = true;
            if (typeof maybePopupConfig === 'string') {
                render(createVNode(maybePopupConfig === 'modal' ? modalVNode : drawerVNode, { ...config }), PopupHostElement.value!);
            } else {
                render(createVNode(modalVNode, { ...(maybePopupConfig || {}) }), PopupHostElement.value!);
            }
        },
        hide() {
            instance.value?.hide();
        },
        destroy() {
            instance.value = null;
            PopupHostElement.value = null;
        }
    };
}

export default McPopup;
