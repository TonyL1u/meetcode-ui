import { defineComponent, getCurrentInstance, renderSlot, CustomVNodeTypes, toRefs, computed, ref } from 'vue';
import { cssUnitTransform } from '../../_utils_';
import { createElementVNode, createComponentVNode } from '../../_utils_';
import { layoutSiderIKey, layoutIKey, layoutSiderProps } from '../interface';
import { McButton } from '../../button';
import { McIcon } from '../../icon';
import { ChevronBackSharp } from '@vicons/ionicons5';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    props: layoutSiderProps,
    emits: ['toggled'],
    setup(props, { slots, emit, expose }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutSider]: McLayoutHeader must be placed inside McLayout.');
        }
        const { width, bordered, collapsed, collapsable, collapsedWidth, triggerPosition, triggerType, transitionMode, onBeforeToggle } = toRefs(props);
        const isCollapsed = ref(!!collapsed.value);
        const mergedWidth = computed(() => cssUnitTransform(isCollapsed.value ? collapsedWidth.value : width.value));
        const cssVars = computed<StyleValue>(() => {
            const { top, bottom } = triggerPosition.value ?? {};

            return {
                '--layout-sider-width': mergedWidth.value,
                '--layout-sider-collapse-button-trigger-top': top || '50%',
                '--layout-sider-collapse-button-trigger-bottom': bottom || '',
                '--layout-sider-scroll-area-min-width': transitionMode.value === 'transform' ? cssUnitTransform(width.value) : ''
            };
        });

        const callToggle = async () => {
            const callback = await onBeforeToggle.value?.(isCollapsed.value);
            if (callback) return;

            isCollapsed.value = !isCollapsed.value;
            emit('toggled', isCollapsed.value);
        };

        const buttonTriggerVNode = () => {
            return createComponentVNode(
                McButton,
                { circle: true, size: 'small' },
                {
                    icon: () =>
                        createComponentVNode(McIcon, null, {
                            default: () => createComponentVNode(ChevronBackSharp)
                        })
                }
            );
        };

        const collapseTriggerVNode = () => {
            return createElementVNode('div', { class: `mc-layout-sider__collapse-${triggerType.value}-trigger`, onClick: callToggle }, [slots.trigger ? renderSlot(slots, 'trigger') : triggerType.value === 'button' ? buttonTriggerVNode() : null]);
        };

        expose({
            toggle: () => {
                isCollapsed.value = !isCollapsed.value;
            }
        });

        // main logic...
        return () => {
            return createElementVNode(
                'aside',
                {
                    class: ['mc-layout-sider', bordered.value ? 'mc-layout-sider--bordered' : '', isCollapsed.value ? 'mc-layout-sider--collapsed' : ''],
                    style: cssVars.value
                },
                [createElementVNode('div', { class: 'mc-layout-sider__scroll-area' }, [renderSlot(slots, 'default')]), collapsable.value ? collapseTriggerVNode() : null]
            );
        };
    }
});
