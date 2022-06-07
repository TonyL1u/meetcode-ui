import { defineComponent, onMounted, createVNode, toRefs, shallowReactive, Fragment, ref, renderList, normalizeClass, normalizeStyle, createElementVNode, createElementBlock, watch } from 'vue';
import { useThemeRegister, flattenTree, PatchFlags } from '../_utils_';
import { useElementBounding, throttledWatch, useTemplateRefsList, useThrottleFn, pausableWatch } from '@vueuse/core';
import { anchorProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Ref, VNodeChild } from 'vue';
import type { AnchorOption } from './interface';

export default defineComponent({
    name: 'Anchor',
    props: anchorProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Anchor',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { options, bound, offsetTop, offsetBottom, type, showTrack } = toRefs(props);
        const prevKey = ref<string>();
        const activeKey = ref<string>();
        const indicatorBarOffsetTop = ref<number>(0);
        const topList = shallowReactive<Record<string, Ref<number>>>({});
        const anchorElRef = ref<HTMLDivElement>();
        const anchorLinkElRefs = useTemplateRefsList<HTMLAnchorElement>();
        const { top: anchorTop } = useElementBounding(anchorElRef);

        const setActiveLink = (key: string) => {
            activeKey.value = key;
            window.history.replaceState(history.state, '', key);
            const activeLinkEl = anchorLinkElRefs.value.find(link => link.hash === key);
            activeLinkEl && setIndicatorBarOffset(activeLinkEl);
        };
        const setIndicatorBarOffset = (target: HTMLAnchorElement) => {
            const { top } = target.getBoundingClientRect();
            indicatorBarOffsetTop.value = top - anchorTop.value;
        };
        const handleScroll = useThrottleFn(
            () => {
                // console.log(Object.entries(topList).map(([key, item]) => item.value));
                const activeLink = Object.entries(topList).find(([key, item]) => item.value <= bound.value! + offsetTop.value! && item.value >= bound.value! - offsetBottom.value!);
                setActiveLink(activeLink?.[0] || '');
            },
            64,
            true,
            true
        );
        const createAnchorLink = (option: AnchorOption): VNodeChild => {
            const { href, title, children } = option;

            return createElementVNode(
                'div',
                {
                    class: normalizeClass(['mc-anchor-link', activeKey.value === href ? 'mc-anchor-link--active' : ''])
                },
                [
                    createElementVNode(
                        'a',
                        {
                            ref: anchorLinkElRefs.value.set,
                            class: 'mc-anchor-link-title',
                            href,
                            onClick: (e: MouseEvent) => {
                                e.preventDefault();
                                const { hash } = e.target as HTMLAnchorElement;
                                const target = document.getElementById(hash.slice(1));

                                // replace hash
                                window.history.replaceState(history.state, '', hash);
                                setIndicatorBarOffset(e.target as HTMLAnchorElement);
                                if (target) {
                                    pause();
                                    target.scrollIntoView();
                                }

                                requestAnimationFrame(() => {
                                    handleScroll();
                                    resume();
                                });
                            }
                        },
                        title,
                        PatchFlags.TEXT | PatchFlags.PROPS,
                        ['href']
                    ),
                    createElementBlock(
                        Fragment,
                        null,
                        renderList(children ?? [], item => createAnchorLink(item)),
                        PatchFlags.UNKEYED_FRAGMENT
                    )
                ],
                PatchFlags.CLASS
            );
        };

        const { pause, resume } = pausableWatch(topList, handleScroll, { immediate: true });

        watch(
            options,
            () => {
                const flattenData = flattenTree<AnchorOption, 'children'>(options.value ?? [], 'children');
                flattenData.forEach(item => {
                    const id = item.href;
                    const el = document.getElementById(id.slice(1));
                    if (el) {
                        const { top } = useElementBounding(el);
                        topList[id] = top;
                    }
                });
            },
            {
                immediate: true,
                deep: true
            }
        );

        onMounted(() => {
            // watch(options, () => {
            //     const flattenData = flattenTree<AnchorOption, 'children'>(options.value ?? [], 'children');
            //     console.log(flattenData);
            //     flattenData.forEach(item => {
            //         const id = item.href;
            //         const el = document.getElementById(id.slice(1));
            //         if (el) {
            //             const { top } = useElementBounding(el);
            //             topList[id] = top;
            //         }
            //     });
            // }, {
            //     immediate: true
            // })
            // throttledWatch(
            //     topList,
            //     () => {
            //         console.log(Object.entries(topList).map(([key, item]) => item.value));
            //         for (const [key, item] of Object.entries(topList)) {
            //             if (item.value <= bound.value! + offsetTop.value! && item.value >= bound.value! - offsetBottom.value!) {
            //                 activeKey.value = key;
            //                 window.history.replaceState(history.state, '', key);
            //                 const activeLinkEl = anchorLinkElRefs.value.find(link => link.hash === key);
            //                 if (activeLinkEl) {
            //                     const { top } = activeLinkEl.getBoundingClientRect();
            //                     indicatorBarOffsetTop.value = top - anchorTop.value;
            //                 }
            //                 break;
            //             } else {
            //                 activeKey.value = '';
            //             }
            //         }
            //     },
            //     {
            //         throttle: 64
            //     }
            // );
        });

        // main logic...
        return () =>
            createElementVNode(
                'div',
                { ref_key: 'anchorElRef', ref: anchorElRef, class: normalizeClass(['mc-anchor', { 'mc-anchor-background': type.value === 'background' }]) },
                [
                    createElementBlock(
                        Fragment,
                        null,
                        renderList(options.value ?? [], item => createAnchorLink(item)),
                        PatchFlags.UNKEYED_FRAGMENT
                    ),
                    type.value === 'bar'
                        ? createElementVNode('div', { class: 'mc-anchor-indicator' }, [
                              showTrack.value ? createElementVNode('div', { class: 'mc-anchor-indicator-track' }, null, PatchFlags.HOISTED) : null,
                              createElementVNode('div', { class: 'mc-anchor-indicator-marker', style: normalizeStyle({ top: `${indicatorBarOffsetTop.value + 4}px` }) }, null, PatchFlags.STYLE)
                          ])
                        : null
                ],
                PatchFlags.CLASS
            );
    }
});
