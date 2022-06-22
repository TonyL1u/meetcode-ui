import { defineComponent, ref, toRefs, computed, unref as _unref, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode, normalizeStyle as _normalizeStyle } from 'vue';
import { McIconSwitchTransition } from '../_transition_';

const _hoisted_1 = ['viewBox'];
const _hoisted_2 = ['values'];
const _hoisted_3 = ['stroke-width', 'cx', 'cy', 'r', 'stroke-dasharray', 'stroke-dashoffset'];
const _hoisted_4 = ['values'];
const _hoisted_5 = ['values'];

export default defineComponent({
    name: 'BaseLoading',
    props: {
        size: {
            type: Number,
            default: 28
        },
        stroke: {
            type: Number,
            default: 20
        },
        color: {
            type: String,
            default: '#10B981'
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const { size, color, stroke, show } = toRefs(props);
        const scale = 1;
        const radius = 100;
        const scaledRadius = radius / scale;

        return () => {
            return (
                _openBlock(),
                _createElementBlock(
                    'div',
                    {
                        class: 'mc-base-loading',
                        style: _normalizeStyle({ display: 'flex', alignItems: 'center', justifyContent: 'center', color: color.value, width: `${size.value}px`, height: `${size.value}px` })
                    },
                    [
                        createVNode(McIconSwitchTransition, null, {
                            default: () =>
                                show.value
                                    ? (_openBlock(),
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
                                                          'stroke-width': stroke.value,
                                                          'stroke-linecap': 'round',
                                                          cx: _unref(scaledRadius),
                                                          cy: _unref(scaledRadius),
                                                          r: radius - stroke.value / 2,
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
                                    : null
                        })
                    ],
                    4 /* STYLE */
                )
            );
        };
    }
});
