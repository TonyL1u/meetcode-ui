import { defineComponent, onMounted } from 'vue';
import { useThemeRegister } from '../_utils_';
import { mainCssr } from './styles';

export default defineComponent({
    setup() {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'NAME',
                main: mainCssr
            });
        });
    }
});
