import { defineComponent, toRefs, createVNode, computed, onMounted } from 'vue';
import { getSlotFirstVNode, useThemeRegister } from '../_utils_';
import { iconProps } from './interface';
import * as CSS from 'csstype';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'Icon',
    props: iconProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McIcon',
                main: mainCssr
            });
        });

        const { size, color, spin, speed } = toRefs(props);

        const spinningSpeed = computed(() => {
            switch (speed.value) {
                case 'slow':
                    return '2s';
                case 'normal':
                    return '1.6s';
                case 'fast':
                    return '1.2s';
                default:
                    return '1.6s';
            }
        });

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--icon-color': color.value ?? 'initial',
                '--icon-font-size': size.value ? `${size.value}px` : 'initial',
                '--icon-spinning-speed': spinningSpeed.value
            };
        });

        return () =>
            createVNode(
                'i',
                {
                    role: 'img',
                    class: ['mc-icon', { 'mc-icon--spinning': spin.value }],
                    style: cssVars.value
                },
                [getSlotFirstVNode(slots.default)]
            );
    }
});
