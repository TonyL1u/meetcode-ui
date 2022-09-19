import { defineComponent } from 'vue';
import { useThemeRegister } from '../_composable_';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'NAME',
    setup() {
        // theme register
        useThemeRegister({
            key: 'NAME',
            main: mainCssr
        });

        // main logic...
    }
});
