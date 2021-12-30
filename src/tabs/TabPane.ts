import { ref, toRefs, inject, computed, createVNode, createCommentVNode, renderSlot, vShow, withDirectives, defineComponent } from 'vue';
import { watchOnce } from '@vueuse/core';
import { tabsInjectionKey, tabPaneIKey, tabPaneProps } from './interface';

export default defineComponent({
    name: 'TabPane',
    iKey: tabPaneIKey,
    props: tabPaneProps,
    setup(props, { slots }) {
        const { name, preload, lazy } = toRefs(props);
        const valueRef = inject(tabsInjectionKey, null);

        if (!valueRef) {
            throw new Error('[McTabPane]: McTabPane must be placed inside McTabs.');
        }
        const isActive = computed(() => {
            return name?.value === valueRef?.value;
        });
        const hasShown = ref(isActive.value);

        if (lazy.value && !hasShown.value) {
            watchOnce(isActive, () => {
                hasShown.value = true;
            });
        }

        return () => {
            const tabPaneVNode = createVNode('div', { class: 'mc-tab-pane' }, [renderSlot(slots, 'default')]);
            if (preload.value) {
                return withDirectives(tabPaneVNode, [[vShow, isActive.value]]);
            } else {
                if (lazy.value) {
                    return hasShown.value ? withDirectives(tabPaneVNode, [[vShow, isActive.value]]) : createCommentVNode('v-if', true);
                } else {
                    return isActive.value ? tabPaneVNode : createCommentVNode('v-if', true);
                }
            }
        };
    }
});
