import { defineComponent, onMounted, createVNode, toRefs, shallowReactive, Fragment, ref, computed } from 'vue';
import { useThemeRegister, flattenTree } from '../_utils_';
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

        const { options, bound, offsetTop, offsetBottom } = toRefs(props);
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
                console.log(Object.entries(topList).map(([key, item]) => item.value));
                const activeLink = Object.entries(topList).find(([key, item]) => item.value <= bound.value! + offsetTop.value! && item.value >= bound.value! - offsetBottom.value!);
                setActiveLink(activeLink?.[0] || '');
            },
            64,
            true,
            true
        );
        const createAnchorLink = (option: AnchorOption): VNodeChild => {
            const { href, title, children } = option;

            return createVNode(
                'div',
                {
                    class: ['mc-anchor-link', activeKey.value === href ? 'mc-anchor-link--active' : '']
                },
                [
                    createVNode(
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
                        [title]
                    ),
                    createVNode(Fragment, null, children ? children.map(item => createAnchorLink(item)) : [])
                ]
            );
        };

        const { pause, resume } = pausableWatch(topList, handleScroll, { immediate: true });

        onMounted(() => {
            const flattenData = flattenTree<AnchorOption, 'children'>(options.value ?? [], 'children');
            flattenData.forEach(item => {
                const id = item.href;
                const el = document.getElementById(id.slice(1));
                if (el) {
                    const { top } = useElementBounding(el);
                    topList[id] = top;
                }
            });

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
            createVNode('div', { ref: anchorElRef, class: 'mc-anchor' }, [
                createVNode(
                    Fragment,
                    null,
                    (options.value ?? []).map(item => createAnchorLink(item))
                ),
                createVNode('div', { class: 'mc-anchor-indicator' }, [createVNode('div', { class: 'mc-anchor-indicator-track' }), createVNode('div', { class: 'mc-anchor-indicator-marker', style: { top: `${indicatorBarOffsetTop.value + 4}px` } })])
            ]);
    }
});
