import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes, toRefs, computed, ref } from 'vue';
import { cssUnitTransform } from '../../_utils_';
import { layoutSiderIKey, layoutIKey, layoutSiderProps } from '../interface';
import { McButton } from '../../button';
import { McIcon } from '../../icon';
import { ChevronBackSharp } from '@vicons/ionicons5';
import * as CSS from 'csstype';

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
        const { width, bordered, collapsed, collapsable, triggerPosition, triggerType, transitionMode, onBeforeToggle } = toRefs(props);
        const isCollapsed = ref(!!collapsed.value);
        const mergedWidth = computed(() => (isCollapsed.value ? '0px' : cssUnitTransform(width.value)));
        const cssVars = computed<CSS.Properties>(() => {
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
            return createVNode(
                McButton,
                { circle: true, size: 'small' },
                {
                    icon: () =>
                        createVNode(McIcon, null, {
                            default: () => createVNode(ChevronBackSharp)
                        })
                }
            );
        };

        const collapseTriggerVNode = () => {
            return createVNode('div', { class: `mc-layout-sider__collapse-${triggerType.value}-trigger`, onClick: callToggle }, [slots.trigger ? renderSlot(slots, 'trigger') : triggerType.value === 'button' ? createVNode(buttonTriggerVNode) : null]);
        };

        expose({
            toggle: () => {
                isCollapsed.value = !isCollapsed.value;
            }
        });

        // main logic...
        return () => {
            return createVNode(
                'aside',
                {
                    class: ['mc-layout-sider', bordered.value ? 'mc-layout-sider--bordered' : '', isCollapsed.value ? 'mc-layout-sider--collapsed' : ''],
                    style: cssVars.value
                },
                [createVNode('div', { class: 'mc-layout-sider__scroll-area' }, [renderSlot(slots, 'default')]), collapsable.value ? createVNode(collapseTriggerVNode) : null]
            );
        };
    }
});
