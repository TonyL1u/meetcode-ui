import { defineComponent, renderSlot, provide, ref } from 'vue';
import { createElementVNode } from '../../_utils_';
import { inputGroupInjectionKey } from '../interface';

export default defineComponent({
    name: 'InputGroup',
    setup(_, { slots }) {
        const validStatus = ref(true);
        const updateValidStatus = (status: boolean) => {
            validStatus.value = status;
        };

        provide(inputGroupInjectionKey, {
            validStatus,
            updateValidStatus
        });

        return () =>
            createElementVNode('div', { class: 'mc-input-group', style: { '--input-border-color': validStatus.value ? '#e0e0e6' : '#dc2626', '--input-active-border-color': validStatus.value ? '#10b981' : '#dc2626' } }, [renderSlot(slots, 'default')]);
    }
});
