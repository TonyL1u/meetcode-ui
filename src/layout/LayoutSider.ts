import { defineComponent, onMounted } from 'vue';
import { useThemeRegister } from '../_utils_';
import { layoutSiderIKey } from './interface';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    setup() {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'NAME',
                main: mainCssr
            });
        });

        // main logic...
    }
});
