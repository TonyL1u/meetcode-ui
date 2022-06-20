import { defineComponent, createElementVNode, openBlock, createElementBlock } from 'vue';

const _hoisted_1 = {
    width: '12px',
    height: '10px',
    viewbox: '0 0 12 10'
};
const _hoisted_2 = /*#__PURE__*/ createElementVNode(
    'polyline',
    {
        points: '1.5 5  10.5 5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2'
    },
    null,
    -1 /* HOISTED */
);
const _hoisted_3 = [_hoisted_2];

export default defineComponent({
    name: 'IconIndeterminateMark',
    render: function () {
        return openBlock(), createElementBlock('svg', _hoisted_1, _hoisted_3);
    }
});
