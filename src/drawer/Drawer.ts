import { defineComponent, onMounted, computed, createVNode, toRefs, ref, Transition, mergeProps, renderSlot, createTextVNode, watch, provide } from 'vue';
import { createKey } from '../_utils_';
import { useThemeRegister, useSharedItems } from '../_composable_';
import { onClickOutside, useMagicKeys, pausableWatch } from '@vueuse/core';
import { McIcon } from '../icon';
import { McButton } from '../button';
import { Close as IconClose } from '@vicons/ionicons5';
import { VLazyTeleport } from 'vueuc';
import { drawerProps, DrawerCloseAction, drawerInjectionKey } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'Drawer',
    inheritAttrs: false,
    props: drawerProps,
    setup(props, { slots, attrs, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Drawer',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { show, size, appearDirection, wrapperClosable, shortcutKey, closeOnShortcut, closable, headerStyle, bodyStyle, headerClass, bodyClass, title, showHeader, pure, onBeforeLeave } = toRefs(props);
        const key = createKey('drawer');
        const drawerElRef = ref<HTMLElement | null>(null);
        const isMountDrawer = ref(true);
        const isTopDrawer = computed(() => topItem.value === key);
        const { add, remove, topItem } = useSharedItems();
        const magicKeys = useMagicKeys({
            passive: false,
            onEventFired(event: Event) {
                isTopDrawer.value && event.stopImmediatePropagation();
            }
        });
        const keys = computed(() => Array.from(magicKeys.current));
        let closeAction: DrawerCloseAction;

        watch(
            show,
            () => {
                if (show.value) {
                    isMountDrawer.value = true;
                    add(key);
                } else {
                    remove(key);
                }
            },
            { immediate: true }
        );

        const { pause, resume } = pausableWatch(magicKeys[shortcutKey.value!], v => {
            if (v && show.value && closeOnShortcut.value && isTopDrawer.value) {
                callShortcutStroke();
                callUpdateShow(false);
            }
        });

        watch(
            isTopDrawer,
            () => {
                if (!isTopDrawer.value) {
                    pause();
                } else {
                    resume();
                }
            },
            { immediate: true }
        );

        onClickOutside(drawerElRef, event => {
            if (wrapperClosable.value && isTopDrawer.value) {
                callWrapperClick(event);
                callUpdateShow(false);
            }
        });

        const callUpdateShow = async (val: boolean) => {
            if (!val) {
                const callback = await onBeforeLeave.value?.(closeAction);
                if (callback) return;
            }

            emit('update:show', val);
        };

        const callWrapperClick = (e: MouseEvent) => {
            closeAction = 'wrapper';
            emit('wrapper-click', e);
        };

        const callShortcutStroke = () => {
            closeAction = 'shortcut';
            emit('shortcut-stroke', keys.value);
        };

        const callAfterEnter = () => {
            emit('after-enter');
        };

        const callAfterLeave = () => {
            isMountDrawer.value = false;
            emit('after-leave');
        };

        const callBeforeEnter = () => {
            emit('before-enter');
        };

        const cssVars = computed<StyleValue>(() => {
            const drawerSize = typeof size.value === 'number' ? `${size.value}px` : size.value;
            const drawerWidth = ['left', 'right'].includes(appearDirection.value!) ? drawerSize : '100vw';
            const drawerHeight = ['top', 'bottom'].includes(appearDirection.value!) ? drawerSize : '100vh';

            return {
                '--drawer-width': drawerWidth,
                '--drawer-height': drawerHeight,
                '--drawer-size': drawerSize
            };
        });

        const headerVNode = computed(() => {
            const titleVNode = createVNode('div', { class: 'mc-drawer-title' }, [typeof title.value === 'string' ? createTextVNode(title.value) : title.value?.()]);
            const closeIconVNode = closable.value
                ? createVNode(
                      McButton,
                      {
                          render: 'text',
                          class: 'mc-drawer-close-button',
                          style: { padding: '0 6px' },
                          onClick: () => {
                              closeAction = 'close';
                              callUpdateShow(false);
                          }
                      },
                      {
                          icon: () => createVNode(McIcon, { size: 20 }, { default: () => createVNode(IconClose) })
                      }
                  )
                : null;

            return !pure.value && showHeader.value ? createVNode('div', { class: ['mc-drawer__header', headerClass.value], style: headerStyle.value }, [slots.header ? renderSlot(slots, 'header') : titleVNode, closeIconVNode]) : null;
        });

        const drawerVNode = computed(() => {
            const mergedProps = mergeProps(
                {
                    ref: drawerElRef,
                    class: ['mc-drawer', pure.value ? 'mc-drawer--pure' : '', `mc-drawer--${appearDirection.value}`]
                },
                attrs
            );

            return createVNode('div', { class: 'mc-drawer-wrapper', style: cssVars.value }, [
                createVNode('div', mergedProps, [headerVNode.value, createVNode('div', { class: ['mc-drawer__body', bodyClass.value], style: bodyStyle.value }, [renderSlot(slots, 'default')])])
            ]);
        });

        const drawerContainerVNode = computed(() => {
            return createVNode('div', { class: 'mc-drawer-container' }, [
                createVNode(
                    Transition,
                    { name: 'mc-drawer-mask-fade', appear: true },
                    {
                        default: () => (show.value ? createVNode('div', { class: 'mc-drawer-mask' }) : null)
                    }
                ),
                createVNode(
                    Transition,
                    { name: `mc-drawer-appear-${appearDirection.value}`, appear: true, onBeforeEnter: callBeforeEnter, onAfterEnter: callAfterEnter, onAfterLeave: callAfterLeave },
                    {
                        default: () => (show.value ? drawerVNode.value : null)
                    }
                )
            ]);
        });

        provide(drawerInjectionKey, drawerElRef);

        expose({
            hide: () => callUpdateShow(false),
            el: drawerElRef
        });

        return () => (isMountDrawer.value ? createVNode(VLazyTeleport, { to: 'body', show: show.value }, { default: () => drawerContainerVNode.value }) : null);
    }
});
