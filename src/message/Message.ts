import { ref, reactive, createApp, TransitionGroup, watch } from 'vue';
import { createComponentVNode, createDirectives, createKey, reactiveOmit, PatchFlags, responsiveTarget } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { VLazyTeleport } from 'vueuc';
import MessageEntity from './MessageEntity';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { omit } from 'lodash-es';
import type { App, FunctionalComponent } from 'vue';
import type { MessageProps, Message, MessageType, MessageApi, MessageOptions, MessageApiOptions, ConfigurableMessage, MessageApiReturnType, CreateMessageApiReturnType, MessageExposeInstance, MessageGlobalConfig } from './interface';

export default function useMessage(config: MessageGlobalConfig = {}) {
    useThemeRegister({
        key: 'Message',
        main: mainCssr,
        light: lightCssr,
        dark: darkCssr
    });

    const items = reactive<Message[]>([]);
    const itemRefsMap = new WeakMap<Message, MessageExposeInstance>();
    const isMounted = ref(false);
    const getMessageVNode = (item: Message, index: number) => {
        const { key, type, options } = item;
        const { className, onClose } = options;

        return createComponentVNode<MessageProps>(
            MessageEntity,
            {
                key,
                type,
                'data-index': index,
                card: config.card ?? false,
                duration: config.duration ?? 3000,
                closable: config.closable ?? false,
                hoverAlive: config.hoverAlive ?? true,
                ...omit(options, 'message', 'className'),
                class: className,
                onClose: () => {
                    onClose?.();
                    close(key);
                },
                onVnodeMounted(vnode) {
                    const exposedInst = vnode.component?.exposed;
                    if (exposedInst) {
                        itemRefsMap.set(item, exposedInst as MessageExposeInstance);
                    }
                },
                onVnodeUnmounted() {
                    itemRefsMap.delete(item);
                }
            },
            {
                default: () => (typeof options.message === 'string' ? options.message : options.message?.())
            },
            PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS,
            ['type', 'duration', 'closable', 'hoverAlive', 'html', 'card', 'icon', 'action', 'key']
        );
    };
    const MessageEnvironment: FunctionalComponent = () => {
        return isMounted.value
            ? createComponentVNode(
                  VLazyTeleport,
                  {
                      to: 'body',
                      show: isMounted.value
                  },
                  {
                      default: () =>
                          createComponentVNode(
                              TransitionGroup,
                              {
                                  name: 'mc-message-slide-down',
                                  class: 'mc-message-global-container',
                                  appear: true,
                                  tag: 'div',
                                  'v-placement': config.placement ?? 'top-center',
                                  style: [{ '--message-item-gap': `${config.itemGap ?? 8}px` }, config.containerStyle ?? {}],
                                  onEnter: (el: HTMLElement) => {
                                      if ((el?.dataset?.index ?? 0) > (config.max ?? Infinity) - 1) {
                                          close(0);
                                      }
                                  },
                                  onAfterLeave: () => {
                                      if (items.length === 0 && isMounted.value) {
                                          unmount();
                                      }
                                  }
                              },
                              {
                                  default: () => createDirectives('v-for', items, (item, index) => getMessageVNode(item, index), true)
                              },
                              PatchFlags.STYLE | PatchFlags.PROPS,
                              ['v-placement']
                          )
                  }
              )
            : null;
    };
    let hostElement: HTMLDivElement | null = null;
    let app: App<Element> | null = null;

    const mount = () => {
        isMounted.value = true;
        hostElement = document.createElement('div');
        app = createApp(createComponentVNode(MessageEnvironment));
        app?.mount(hostElement!);
    };

    const unmount = () => {
        isMounted.value = false;
        app?.unmount();
        app = null;
        hostElement = null;
    };

    const close = (key: string | number) => {
        if (typeof key === 'string') {
            const index = items.findIndex(item => item.key === key);
            index > -1 && items.splice(index, 1);
        } else {
            items.splice(key, 1);
        }
    };

    const create = <S extends boolean>(type: MessageType, options: MessageApiOptions, isAsync: S) => {
        const message = reactive<Message>({
            key: createKey('message'),
            type,
            options
        });
        items.push(message);

        const proxyMessage = new Proxy<Record<string, any>>(message, {
            set(target, p, value) {
                if (p === 'key') {
                    return false;
                } else if (p === 'type') {
                    return Reflect.set(target, p, value);
                } else {
                    return Reflect.set(target.options, p, value);
                }
            },
            get(target, p) {
                if (p === 'key' || p === 'type') {
                    return Reflect.get(target, p);
                } else if (p === 'close' || p === 'el') {
                    return itemRefsMap.get(target as Message)?.[p];
                } else {
                    return Reflect.get(target.options, p);
                }
            }
        }) as ConfigurableMessage;

        return (
            isAsync
                ? new Promise<ConfigurableMessage>(resolve => {
                      const originalOnCloseHandler = proxyMessage.onClose;
                      proxyMessage.onClose = () => {
                          originalOnCloseHandler?.();
                          resolve(proxyMessage);
                      };
                  })
                : proxyMessage
        ) as MessageApiReturnType<S>;
    };

    function createMessageApi<S extends true>(type: MessageType, isAsync: S): CreateMessageApiReturnType<S>;
    function createMessageApi<S extends false>(type: MessageType, isAsync: S): CreateMessageApiReturnType<S>;
    function createMessageApi<S extends boolean>(type: MessageType, isAsync: S): CreateMessageApiReturnType<S> {
        function ApiConstructor(options: MessageApiOptions): MessageApiReturnType<S>;
        function ApiConstructor(content: string): MessageApiReturnType<S>;
        function ApiConstructor(content: string, options: MessageApiOptions): MessageApiReturnType<S>;
        function ApiConstructor(maybeOptions: string | MessageApiOptions, options: MessageApiOptions = {}) {
            if (typeof maybeOptions === 'string') {
                return create(type, { message: maybeOptions, ...options }, isAsync);
            } else {
                return create(type, { message: '', ...maybeOptions, ...options }, isAsync);
            }
        }

        return ApiConstructor;
    }

    // @ts-ignore
    const McMessage: MessageApi<false> = (options: MessageOptions) => {
        const reactiveOptions = responsiveTarget(options);
        return create(reactiveOptions.type, reactiveOmit(reactiveOptions, 'type'), false);
    };
    // @ts-ignore
    const McAsyncMessage: MessageApi<true> = (options: MessageOptions) => {
        const reactiveOptions = responsiveTarget(options);
        return create(reactiveOptions.type, reactiveOmit(reactiveOptions, 'type'), true);
    };

    (['text', 'success', 'warning', 'info', 'error', 'loading'] as const).forEach(type => {
        McMessage[type] = createMessageApi(type, false);
        McAsyncMessage[type] = createMessageApi(type, true);
    });

    watch(items, () => {
        if (items.length > 0 && !isMounted.value) {
            mount();
        }
    });

    return { McMessage, McAsyncMessage, close };
}
