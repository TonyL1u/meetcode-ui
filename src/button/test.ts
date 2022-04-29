import { onMounted, defineComponent, createVNode, PropType } from 'vue';

type TProps = {
    src?: string;
    width?: number;
    height?: number;
    mode?: 'stretch' | 'cover' | 'contain';
};

export default defineComponent({
    props: {
        /**
         * ### 填充模式
         * - `stretch` 拉伸充满
         * - `cover` 裁切充满，保持图片比例
         * - `contain` 全部显示，留白，保持图片比例
         */
        mode: {
            type: String as PropType<TProps['mode']>,
            default: 'cover'
        }
    },
    setup(props, { slots }) {
        console.log(slots);
        return () => createVNode('div', {}, [props.mode]);
    }
});

// export default (props: TProps) => <Comp {...props} />;
