import { defineComponent, onMounted } from 'vue';
import { useThemeRegister, createElementVNode, createKey } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Switch',
    setup() {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McSwitch',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const key = createKey('switch');

        // main logic...
        return () => createElementVNode('div', { class: 'mc-switch' }, [createElementVNode('input', { class: 'mc-switch__input', id: key, type: 'checkbox' }), createElementVNode('label', { class: 'mc-switch__label', for: key })]);
    }
});
