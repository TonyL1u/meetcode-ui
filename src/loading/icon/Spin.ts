import { unref as _unref, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle } from 'vue';

const _hoisted_1 = ['viewBox'];
const _hoisted_2 = ['values'];
const _hoisted_3 = ['cx', 'cy', 'r', 'stroke-dasharray', 'stroke-dashoffset'];
const _hoisted_4 = ['values'];
const _hoisted_5 = ['values'];

import { computed } from 'vue';

const __sfc__ = {
    __name: 'App',
    setup(__props) {
        const scale = 1;
        const radius = 100;
        const strokeWidth = 28;
        const stroke = '#10B981';

        const scaledRadius = computed(() => {
            return radius / scale;
        });

        return (_ctx, _cache) => {
            return (
                _openBlock(),
                _createElementBlock(
                    'div',
                    {
                        class: 'mc-loading--spin',
                        style: _normalizeStyle({ color: stroke })
                    },
                    [
                        (_openBlock(),
                        _createElementBlock(
                            'svg',
                            {
                                viewBox: `0 0 ${2 * _unref(scaledRadius)} ${2 * _unref(scaledRadius)}`,
                                xmlns: 'http://www.w3.org/2000/svg'
                            },
                            [
                                _createElementVNode('g', null, [
                                    _createElementVNode(
                                        'animateTransform',
                                        {
                                            attributeName: 'transform',
                                            type: 'rotate',
                                            values: `0 ${_unref(scaledRadius)} ${_unref(scaledRadius)};270 ${_unref(scaledRadius)} ${_unref(scaledRadius)}`,
                                            begin: '0s',
                                            dur: '1.4s',
                                            fill: 'freeze',
                                            repeatCount: 'indefinite'
                                        },
                                        null,
                                        8 /* PROPS */,
                                        _hoisted_2
                                    ),
                                    _createElementVNode(
                                        'circle',
                                        {
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': strokeWidth,
                                            'stroke-linecap': 'round',
                                            cx: _unref(scaledRadius),
                                            cy: _unref(scaledRadius),
                                            r: radius - strokeWidth / 2,
                                            'stroke-dasharray': 5.67 * radius,
                                            'stroke-dashoffset': 18.48 * radius
                                        },
                                        [
                                            _createElementVNode(
                                                'animateTransform',
                                                {
                                                    attributeName: 'transform',
                                                    type: 'rotate',
                                                    values: `0 ${_unref(scaledRadius)} ${_unref(scaledRadius)};135 ${_unref(scaledRadius)} ${_unref(scaledRadius)};450 ${_unref(scaledRadius)} ${_unref(scaledRadius)}`,
                                                    begin: '0s',
                                                    dur: '1.4s',
                                                    fill: 'freeze',
                                                    repeatCount: 'indefinite'
                                                },
                                                null,
                                                8 /* PROPS */,
                                                _hoisted_4
                                            ),
                                            _createElementVNode(
                                                'animate',
                                                {
                                                    attributeName: 'stroke-dashoffset',
                                                    values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`,
                                                    begin: '0s',
                                                    dur: '1.4s',
                                                    fill: 'freeze',
                                                    repeatCount: 'indefinite'
                                                },
                                                null,
                                                8 /* PROPS */,
                                                _hoisted_5
                                            )
                                        ],
                                        8 /* PROPS */,
                                        _hoisted_3
                                    )
                                ])
                            ],
                            8 /* PROPS */,
                            _hoisted_1
                        ))
                    ],
                    4 /* STYLE */
                )
            );
        };
    }
};
__sfc__.__file = 'App.vue';
export default __sfc__;
