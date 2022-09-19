import { defineComponent, createElementVNode, openBlock, createElementBlock } from 'vue';

const _hoisted_1$1 = {
    width: '12px',
    height: '10px',
    viewbox: '0 0 12 10'
};
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode(
    'polyline',
    {
        points: '1.5 6 4.5 9 10.5 1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2'
    },
    null,
    -1 /* HOISTED */
);
const _hoisted_3$1 = [_hoisted_2$1];

export default defineComponent({
    name: 'IconCheckMark',
    render: function () {
        return openBlock(), createElementBlock('svg', _hoisted_1$1, _hoisted_3$1);
    }
});
