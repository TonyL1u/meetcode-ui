import { defineComponent } from 'vue';
import { useThemeRegister } from '../_utils_';
import { mainCssr } from './styles';

export default defineComponent({
    setup() {
        // theme register
        useThemeRegister({
            key: 'NAME',
            main: mainCssr
        });
    }
});
