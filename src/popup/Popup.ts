import { render, createVNode, ref, Component, FunctionalComponent, isRef, defineComponent, createApp } from 'vue';
import { PopupSourceOptions, PopupInstance, PopupModalConfig, PopupDrawerConfig, PopupType } from './interface';
import { McModal } from '../modal';
import { McDrawer } from '../drawer';
import type { ObjectEmitsOptions, App } from 'vue';
import type { ModalExposeInstance } from '../modal';
import type { DrawerExposeInstance } from '../drawer';

function McPopup<P extends Record<string, any> = {}, E extends ObjectEmitsOptions = {}>(source: Component | string, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    let PopupApp: App<Element> | null = null;
    let PopupHostElement: HTMLDivElement | null = document.createElement('div');

    const instance = ref<ModalExposeInstance | DrawerExposeInstance | null>();
    const visible = ref(false);
    const destroy = () => {
        instance.value = null;
        PopupHostElement = null;
        PopupApp?.unmount();
        PopupApp = null;
    };
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
                onAfterLeave: () => {
                    (options.autoDestroy ?? true) && destroy();
                    props['onAfterLeave']?.();
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
                },
                onAfterLeave: () => {
                    (options.autoDestroy ?? true) && destroy();
                    props['onAfterLeave']?.();
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
            if (instance.value === null || PopupHostElement === null) {
                throw new Error('[McPopup]: Current instance has been destroyed.');
            }
            visible.value = true;
            if (!PopupApp) {
                PopupApp = createApp(typeof maybePopupConfig === 'string' ? createVNode(maybePopupConfig === 'modal' ? modalVNode : drawerVNode, { ...config }) : createVNode(modalVNode, { ...(maybePopupConfig ?? {}) }));
                // register plugins
                const { plugins } = options;
                plugins?.forEach(plugin => PopupApp!.use(plugin));

                PopupApp.mount(PopupHostElement);
            }
        },
        hide() {
            instance.value?.hide();
        },
        destroy
    };
}

export default McPopup;
