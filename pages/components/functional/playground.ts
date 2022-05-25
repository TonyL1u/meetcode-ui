import { createVNode } from 'vue';
import { McLoading, useThemeController } from 'meetcode-ui';
import Playground from '@playground/Playground.vue';
import type { FunctionalComponent } from 'vue';

interface Props {
    isLoading: boolean;
}
type Emit = {
    'cancel-loading': () => void;
};
const PlaygroundComp: FunctionalComponent<Props, Emit> = (props, { emit }) => {
    const { isLight } = useThemeController();

    return createVNode(
        McLoading,
        {
            size: 'large',
            type: 'ripple',
            show: props.isLoading,
            maskStyle: { background: isLight.value ? '#fff' : '#313540' },
            contentStyle: { height: '100%' },
            style: { height: '100%' }
        },
        {
            default: () =>
                createVNode(Playground, {
                    onRenderFinished: () => {
                        emit('cancel-loading');
                    }
                })
        }
    );
};

PlaygroundComp.emits = ['cancel-loading'];

export default PlaygroundComp;
