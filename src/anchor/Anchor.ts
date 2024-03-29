import { defineComponent, onMounted, toRefs, shallowReactive, ref, watch } from 'vue';
import { flattenTree, PatchFlags, createElementVNode, createDirectives } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { useElementBounding, throttledWatch, useTemplateRefsList } from '@vueuse/core';
import { anchorProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Ref, VNodeChild } from 'vue';
import type { AnchorOption } from './interface';

export default defineComponent({
    name: 'Anchor',
    props: anchorProps,
    emits: ['change'],
    setup(props, { emit, expose }) {
        // theme register
        useThemeRegister({
            key: 'Anchor',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });

        const { options, bound, offsetTop, offsetBottom, type, showTrack, showMarker } = toRefs(props);
        const activeKey = ref<string>();
        const indicatorBarOffsetTop = ref<number>(0);
        const topList = shallowReactive<Record<string, Ref<number>>>({});
        const anchorElRef = ref<HTMLDivElement>();
        const anchorLinkElRefs = useTemplateRefsList<HTMLAnchorElement>();
        const { top: anchorTop } = useElementBounding(anchorElRef);

        const callChange = (target: string) => {
            emit('change', target);
        };
        const setActiveLink = (key: string) => {
            activeKey.value = key;
            const activeLinkEl = anchorLinkElRefs.value.find(link => link.hash === key);
            activeLinkEl && setIndicatorBarOffset(activeLinkEl);
        };
        const setIndicatorBarOffset = (target: HTMLAnchorElement) => {
            const { top } = target.getBoundingClientRect();
            indicatorBarOffsetTop.value = top - anchorTop.value;
        };
        const createAnchorLink = (option: AnchorOption): VNodeChild => {
            const { href, title, children } = option;

            return createElementVNode(
                'div',
                {
                    class: ['mc-anchor-link', activeKey.value === href ? 'mc-anchor-link--active' : '']
                },
                [
                    createElementVNode(
                        'a',
                        {
                            ref: anchorLinkElRefs.value.set,
                            class: 'mc-anchor-link-title',
                            href,
                            onClick: e => {
                                e.preventDefault();
                                const { hash } = e.target as HTMLAnchorElement;
                                if (hash === activeKey.value) return;

                                window.location.hash = hash;
                                const target = document.getElementById(hash.slice(1));
                                target?.scrollIntoView();
                                callChange(hash);
                                setIndicatorBarOffset(e.target as HTMLAnchorElement);
                            }
                        },
                        [typeof title === 'string' ? title : title?.()],
                        PatchFlags.PROPS,
                        ['href']
                    ),
                    createDirectives('v-for', children ?? [], item => createAnchorLink(item))
                ],
                PatchFlags.CLASS
            );
        };
        const setTargetElement = (options: AnchorOption[]) => {
            const flattenData = flattenTree<AnchorOption, 'children'>(options, 'children');
            flattenData.forEach(item => {
                const id = item.href;
                const el = document.getElementById(id.slice(1));
                if (el) {
                    const { top } = useElementBounding(el);
                    topList[id] = top;
                }
            });
        };

        throttledWatch(
            topList,
            () => {
                // console.log(Object.entries(topList).map(([key, value]) => value.value));
                const activeLink = Object.entries(topList).find(([key, item]) => item.value <= bound.value! + offsetTop.value! && item.value >= bound.value! - offsetBottom.value!);
                setActiveLink(activeLink?.[0] || '');
            },
            {
                throttle: 64
            }
        );

        watch(
            options,
            () => {
                setTargetElement(options.value ?? []);
            },
            {
                deep: true
            }
        );

        onMounted(() => {
            setTargetElement(options.value ?? []);
        });

        expose({
            el: anchorElRef.value,
            scrollTo(href: string) {
                const target = document.getElementById(href.slice(1));
                target?.scrollIntoView({
                    behavior: 'smooth'
                });
                callChange(href);
            }
        });

        // main logic...
        return () =>
            createElementVNode(
                'div',
                { ref_key: 'anchorElRef', ref: anchorElRef, class: ['mc-anchor', `mc-anchor-type-${type.value}`] },
                [
                    createDirectives('v-for', options.value ?? [], item => createAnchorLink(item)),
                    type.value === 'bar'
                        ? createElementVNode('div', { class: 'mc-anchor-indicator' }, [
                              showTrack.value ? createElementVNode('div', { class: 'mc-anchor-indicator-track' }) : null,
                              showMarker.value ? createElementVNode('div', { class: 'mc-anchor-indicator-marker', style: { top: `${indicatorBarOffsetTop.value + 4}px` } }, null, PatchFlags.STYLE) : null
                          ])
                        : null
                ],
                PatchFlags.CLASS
            );
    }
});
