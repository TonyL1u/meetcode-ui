import { defineComponent } from 'vue';
import { useThemeRegister } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    setup() {
        // theme register
        useThemeRegister({
            key: 'NAME',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });
    }
});
