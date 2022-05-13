import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes, toRefs, computed, ref } from 'vue';
import { layoutSiderIKey, layoutIKey, layoutSiderProps } from '../interface';
import { McButton } from '../../button';
import { McIcon } from '../../icon';
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    props: layoutSiderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutSider]: McLayoutHeader must be placed inside McLayout.');
        }
        const { width, bordered, collapsable } = toRefs(props);
        const isCollapsed = ref(false);
        const mergedWidth = computed(() => (isCollapsed.value ? '0px' : typeof width.value === 'number' ? `${width.value}px` : width.value));
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--layout-sider-width': mergedWidth.value
            };
        });

        const collapseTriggerVNode = () => {
            return createVNode('div', { class: 'mc-layout-sider-collapse-trigger', style: { right: isCollapsed.value ? '-13px' : '' } }, [
                createVNode(
                    McButton,
                    {
                        circle: true,
                        size: 'small',
                        onClick: () => {
                            isCollapsed.value = !isCollapsed.value;
                        }
                    },
                    {
                        icon: () =>
                            createVNode(McIcon, null, {
                                default: () => createVNode(isCollapsed.value ? ChevronForwardOutline : ChevronBackOutline)
                            })
                    }
                )
            ]);
        };

        // main logic...
        return () => {
            return createVNode(
                'aside',
                {
                    class: ['mc-layout-sider', bordered.value ? 'mc-layout-sider--bordered' : ''],
                    style: cssVars.value
                },
                [createVNode('div', { class: 'mc-layout-sider-scroll-area' }, [renderSlot(slots, 'default')]), collapsable.value ? createVNode(collapseTriggerVNode) : null]
            );
        };
    }
});
