import { defineComponent } from 'vue';
import { useThemeRegister } from '../_composable_';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'NAME',
    setup() {
        // theme register
        useThemeRegister({
            key: 'NAME',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });

        // main logic...
    }
});
