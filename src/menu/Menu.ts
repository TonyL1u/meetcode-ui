import { defineComponent, onMounted } from 'vue';
import { useThemeRegister } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'NAME',
    setup() {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'NAME',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        // main logic...
    }
});
