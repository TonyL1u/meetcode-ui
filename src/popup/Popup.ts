import { createVNode, ref, isRef, defineComponent, createApp } from 'vue';
import { McModal } from '../modal';
import { McDrawer } from '../drawer';
import type { ObjectEmitsOptions, App, Plugin, Component, FunctionalComponent } from 'vue';
import type { PopupSourceOptions, PopupInstance, PopupModalConfig, PopupDrawerConfig, PopupType } from './interface';
import type { ModalExposeInstance } from '../modal';
import type { DrawerExposeInstance } from '../drawer';

export class PopupProvider {
    private app: App<Element> | null = null;
    private rootComponent: Component | null = null;
    private hostElement: HTMLDivElement | null = null;
    private plugins: Plugin[] = [];
    // public plugins
    private static readonly _plugins: Plugin[] = [];

    constructor(rootComponent: Component) {
        this.rootComponent = rootComponent;
        this.app = createApp(this.rootComponent);
        this.hostElement = document.createElement('div');
    }

    registerPlugins(plugins: Plugin[] = []) {
        this.plugins = [...this.plugins, ...plugins];
    }

    mount() {
        if (!this.app || !this.hostElement) return;
        // register plugins
        [...this.plugins, ...PopupProvider._plugins].forEach(plugin => this.app!.use(plugin));
        // mount app
        this.app.mount(this.hostElement);
    }

    unmount() {
        this.app?.unmount();
        this.app = null;
        this.hostElement = null;
        this.rootComponent = null;
    }

    public static use(plugin: Plugin) {
        PopupProvider._plugins.push(plugin);

        return PopupProvider;
    }
}

function McPopup<P extends Record<string, any> = {}, E extends ObjectEmitsOptions = {}>(source: Component | string, options: PopupSourceOptions<P, E> = {}): PopupInstance {
    let PopupApp: PopupProvider | null = null;
    const instance = ref<ModalExposeInstance | DrawerExposeInstance | null>();
    const visible = ref(false);
    const destroy = () => {
        instance.value = null;
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
            if (instance.value === null) {
                throw new Error('[McPopup]: Current popup instance has been destroyed.');
            }
            visible.value = true;
            if (!PopupApp) {
                const { plugins = [] } = options;
                PopupApp = new PopupProvider(typeof maybePopupConfig === 'string' ? createVNode(maybePopupConfig === 'modal' ? modalVNode : drawerVNode, { ...config }) : createVNode(modalVNode, { ...(maybePopupConfig ?? {}) }));
                PopupApp.registerPlugins(plugins);
                PopupApp.mount();
            }
        },
        hide() {
            instance.value?.hide();
        },
        destroy
    };
}

export default McPopup;
