import { defineComponent, onMounted, onUnmounted, ref, toRefs, computed, watch, shallowRef, nextTick } from 'vue';
import { useThemeRegister, createElementVNode, renderSlot, PatchFlags } from '../_utils_';
import { useElementVisibility, useElementBounding } from '@vueuse/core';
import { progressProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import Anime from 'animejs';
import type { StyleValue } from 'vue';
import type { AnimeInstance } from 'animejs';
import type { ProgressUpdatePayload } from './interface';

export default defineComponent({
    name: 'NAME',
    props: progressProps,
    emits: ['update', 'begin', 'complete', 'pause', 'seek', 'reset', 'restart'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'NAME',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { animation, autoplay, loop, delay, start, end, duration, percentage, indicatorPlacement, color, type, height, strokeWidth, size, showIndicator, indicatorColor, trackColor } = toRefs(props);
        if (start.value! > 100 || start.value! < 0) {
            throw new Error('[McProgress]: The start value should be in range of [0, 100].');
        } else if (end.value! > 100 || end.value! < 0) {
            throw new Error('[McProgress]: The end value should be in range of [0, 100].');
        }

        const progressElRef = ref<HTMLElement>();
        const progressIsVisible = useElementVisibility(progressElRef);
        const { top } = useElementBounding(progressElRef);

        const animeInstance = shallowRef<AnimeInstance | null>(null);
        const animeAdjustCoefficient = computed(() => Math.abs(start.value! - end.value!) / 100);
        const animeTime = ref(0);
        const animePercentage = ref(start.value!);
        const animeProgress = ref(0);
        const animePayload = computed<ProgressUpdatePayload>(() => {
            return {
                percentage: animePercentage.value,
                progress: animeProgress.value,
                time: animeTime.value
            };
        });
        const animeGaugeDasharray = computed(() => {
            const perimeter = Math.PI * 2 * gaugeRadius.value;
            return (percentageInUsed.value / 100) * perimeter + ' ' + perimeter;
        });

        const gaugeRadius = computed(() => (size.value! - strokeWidth.value!) / 2);

        const percentageInUsed = computed(() => (animation.value ? animePercentage.value : percentage.value!));
        const cssVars = computed<StyleValue>(() => {
            return {
                '--progress-color': color.value,
                '--progress-track-color': trackColor.value,
                '--progress-width': `${percentageInUsed.value}%`,
                '--progress-inner-transition': animation.value ? 'none' : '0.2s',
                '--progress-line-height': `${height.value}px`,
                '--progress-circle-size': `${size.value}px`,
                '--progress-indicator-color': indicatorColor.value
            };
        });

        watch([start, end], () => {
            handleReset();
        });

        watch(loop, () => {});

        const createAnimation = () => {
            animeInstance.value?.pause();
            Anime.remove(animePercentage);

            return Anime({
                targets: animePercentage,
                value: [start.value, end.value],
                easing: 'linear',
                loop: loop.value,
                autoplay: autoplay.value,
                delay: delay.value,
                duration: duration.value! * animeAdjustCoefficient.value,
                update(anim) {
                    updateAnimValue(anim);
                    emit('update', animePayload.value);
                },
                change(anim) {
                    if (!anim.began && anim.paused) {
                        nextTick(() => {
                            updateAnimValue(anim);
                            emit('seek', animePayload.value);
                            emit('update', animePayload.value);
                        });
                    }
                },
                begin(anim) {
                    updateAnimValue(anim);
                    emit('begin');
                },
                complete(anim) {
                    updateAnimValue(anim);
                    emit('complete');
                }
            });
        };
        const updateAnimValue = (anim: AnimeInstance) => {
            animeProgress.value = anim.progress;
            animeTime.value = anim.currentTime;
        };
        const handleReset = () => {
            animeInstance.value = createAnimation();
            updateAnimValue(animeInstance.value);
            emit('reset');
            emit('update', animePayload.value);
        };

        const indicatorVNode = () => {
            return showIndicator.value
                ? createElementVNode(
                      'div',
                      {
                          class: ['mc-progress-indicator', { [indicatorPlacement.value!]: type.value !== 'circle' }]
                      },
                      slots.indicator
                          ? renderSlot(slots, 'indicator', {
                                percentage: percentageInUsed.value,
                                progress: animation.value ? animeProgress.value : 0,
                                time: animation.value ? animeTime.value : 0,
                                duration: animation.value ? duration.value! * animeAdjustCoefficient.value : 0
                            })
                          : `${animation.value ? ~~percentageInUsed.value : percentageInUsed.value}%`
                  )
                : null;
        };

        watch(progressIsVisible, val => {
            console.log(val);
            // if (val) {
            //     animeInstance.value?.play();
            //     off();
            // } else {
            //     animeInstance.value?.pause();
            // }
        });

        onMounted(() => {
            if (animation.value) {
                animeInstance.value = createAnimation();
                console.log(progressElRef.value);
            }
        });

        onUnmounted(() => {
            animeInstance.value = null;
        });

        expose({
            play: () => {
                const { began, paused } = animeInstance.value!;
                if (began && paused) emit('begin');
                animeInstance.value?.play();
            },
            pause: () => {
                animeInstance.value?.pause();
                emit('pause');
            },
            restart: () => {
                animeInstance.value?.restart();
                emit('restart');
                emit('update', animePayload.value);
            },
            reset: handleReset,
            seekTime: (time: number, force: boolean = false) => {
                if (force || (time >= 0 && time <= animeInstance.value?.duration!)) {
                    animeInstance.value = createAnimation();
                    animeInstance.value?.seek(time);
                }
            },
            seekPercentage: (percentage: number, force: boolean = false) => {
                const normalizedPercentage = Math.abs(start.value! - percentage) / animeAdjustCoefficient.value / 100;
                if (force || (normalizedPercentage >= 0 && normalizedPercentage <= 1)) {
                    animeInstance.value = createAnimation();
                    animeInstance.value?.seek(normalizedPercentage * animeInstance.value.duration);
                }
            },
            seekProgress: (progress: number, force: boolean = false) => {
                if (force || (progress >= 0 && progress <= 100)) {
                    animeInstance.value = createAnimation();
                    animeInstance.value?.seek((progress / 100) * animeInstance.value.duration);
                }
            }
        });

        // main logic...
        return () =>
            createElementVNode(
                'div',
                { ref: progressElRef, class: ['mc-progress', `mc-progress--${type.value}`], style: cssVars.value },
                [
                    type.value === 'circle'
                        ? createElementVNode(
                              'div',
                              {
                                  class: 'mc-progress-graph'
                              },
                              [
                                  createElementVNode(
                                      'svg',
                                      {
                                          width: size.value,
                                          height: size.value
                                      },
                                      [
                                          createElementVNode(
                                              'circle',
                                              {
                                                  class: 'mc-progress-graph-outer',
                                                  cx: size.value! / 2,
                                                  cy: size.value! / 2,
                                                  r: gaugeRadius.value,
                                                  'stroke-width': strokeWidth.value,
                                                  fill: 'none'
                                              },
                                              null,
                                              PatchFlags.PROPS,
                                              ['cx', 'cy', 'r', 'stroke-width']
                                          ),
                                          createElementVNode(
                                              'circle',
                                              {
                                                  class: 'mc-progress-graph-inner',
                                                  cx: size.value! / 2,
                                                  cy: size.value! / 2,
                                                  r: gaugeRadius.value,
                                                  'stroke-width': strokeWidth.value,
                                                  'stroke-linecap': 'round',
                                                  'stroke-opacity': +(percentageInUsed.value !== 0),
                                                  fill: 'none',
                                                  transform: `matrix(0,-1,1,0,0,${size.value})`,
                                                  'stroke-dasharray': animeGaugeDasharray.value
                                              },
                                              null,
                                              PatchFlags.PROPS,
                                              ['cx', 'cy', 'r', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'transform']
                                          )
                                      ],
                                      PatchFlags.PROPS,
                                      ['width', 'height']
                                  ),
                                  indicatorVNode()
                              ]
                          )
                        : createElementVNode(
                              'div',
                              {
                                  class: 'mc-progress-graph'
                              },
                              [
                                  createElementVNode(
                                      'div',
                                      {
                                          class: 'mc-progress-graph-inner'
                                      },
                                      [indicatorPlacement.value === 'inside' ? indicatorVNode() : null]
                                  )
                              ]
                          ),
                    indicatorPlacement.value === 'outside' && type.value === 'line' ? indicatorVNode() : null
                ],
                PatchFlags.CLASS | PatchFlags.STYLE
            );
    }
});
