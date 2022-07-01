import { ref, toRefs, computed, watch, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, nextTick, VNode, Slots, CustomVNodeTypes, defineComponent, onMounted } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape, SpecificVNode, useThemeRegister } from '../_utils_';
import { useElementBounding, throttledWatch } from '@vueuse/core';
import { tabsInjectionKey, tabPaneIKey, tabIKey, TabPaneName, MaybeTabPaneProps, tabsProps } from './interface';
import McTab from './src/Tab';
import * as CSS from 'csstype';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Tabs',
    props: tabsProps,
    emits: ['update:value', 'tab-switch', 'tab-click'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Tabs',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { value: valueVM, defaultTab, type, showLine, center, stretch, tabGap, animation, activeColor, barPosition, headerStyle, headerClass, contentStyle, contentClass, onBeforeTabSwitch } = toRefs(props);
        const activeTabName = ref(valueVM?.value || (defaultTab?.value ?? ''));
        const activeTabVNode = ref<VNode>();
        const tabsElRef = ref<HTMLElement>();
        const headerElRef = ref<HTMLElement>();
        const barElRef = ref<HTMLElement>();
        const barUpdatedTimer = ref();
        const cssVars = computed<CSS.Properties>(() => {
            return {
                // '--tab-default-color': defaultColor.value,
                '--tab-active-color': activeColor.value,
                '--tab-gap': stretch.value ? 0 : (tabGap.value ?? 0) / 2 + 'px'
            };
        });

        if (valueVM) {
            watch(valueVM, name => {
                name && handleBeforeTabSwitch(name);
            });
        }

        if (type.value === 'bar' || type.value === 'segment') {
            if (animation.value === 'slide') {
                watch(activeTabVNode, () => {
                    nextTick(() => {
                        updateBarStyle();
                    });
                });
                const { top, right, width, height } = useElementBounding(headerElRef);
                throttledWatch(
                    [top, right, width, height],
                    () => {
                        clearBarUpdatedTimer();
                        const { value: barEl } = barElRef;
                        barEl!.style.transition = '0s';
                        updateBarStyle();
                    },
                    {
                        throttle: 32
                    }
                );
            }
        }

        const callUpdateTab = (name: TabPaneName) => {
            activeTabName.value = name;
            valueVM && emit('update:value', name);
            emit('tab-switch', name);
        };
        const handleTabClick = (name: TabPaneName) => {
            emit('tab-click', name);
            handleBeforeTabSwitch(name);
        };
        const handleBeforeTabSwitch = async (name: TabPaneName) => {
            // callback only when the value is changed
            if (activeTabName.value !== name) {
                if (onBeforeTabSwitch?.value) {
                    const { value: beforeTabSwitch } = onBeforeTabSwitch;
                    const callback = await beforeTabSwitch(activeTabName.value, name);
                    if (callback || callback === undefined) {
                        callUpdateTab(name);
                    }
                } else {
                    callUpdateTab(name);
                }
            }
        };

        const clearBarUpdatedTimer = () => {
            window.clearTimeout(barUpdatedTimer.value);
            barUpdatedTimer.value = null;
        };

        const updateBarStyle = () => {
            if (!activeTabVNode.value) return;

            const {
                value: { el: activeTabEl }
            } = activeTabVNode;
            const { value: barEl } = barElRef;
            const { offsetWidth, offsetLeft } = activeTabEl!;

            barEl!.style.left = `${offsetLeft}px`;
            barEl!.style.maxWidth = `${offsetWidth}px`;
            barUpdatedTimer.value = window.setTimeout(() => {
                barEl!.style.transition = '0.2s';
            }, 64);
        };

        provide(tabsInjectionKey, activeTabName);

        const getTabVNode = (maybeTabPane: SpecificVNode<MaybeTabPaneProps>) => {
            const { children, props, type } = maybeTabPane;
            const { name, tabLabel = '', tabStyle = '', tabClass = '', disabled = false } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
            const isTab = (type as CustomVNodeTypes).iKey === tabIKey;
            const isActive = activeTabName.value === name;
            const isDisabled = typeof disabled === 'boolean' ? disabled : disabled === '';
            const tabVNode = createVNode(
                McTab,
                mergeProps(isTab ? maybeTabPane.props ?? {} : { style: tabStyle }, {
                    class: [{ 'mc-tabs-tab--active': isActive, 'mc-tabs-tab--disabled': isDisabled }, tabClass],
                    onClick: () => {
                        if (isDisabled) return;
                        name !== undefined && handleTabClick(name);
                    }
                }),
                {
                    default: () => {
                        if (isTab) {
                            return (children as Slots)?.default?.() ?? null;
                        } else {
                            return (children as Slots)?.tab?.() ?? [createVNode('span', { class: 'mc-tabs-tab__label' }, [typeof tabLabel === 'string' ? createTextVNode(tabLabel) : tabLabel()])];
                        }
                    }
                }
            );
            if (isActive) {
                activeTabVNode.value = tabVNode;
            }

            return tabVNode;
        };

        const lineBarVNode = computed(() => {
            if (type.value === 'bar') {
                if (animation.value === 'slide') {
                    return createVNode('div', {
                        ref: barElRef,
                        class: ['mc-tabs__header-bar', `mc-tabs__header-bar--${barPosition.value}`]
                    });
                }
            } else if (type.value === 'segment') {
                if (animation.value === 'slide') {
                    return createVNode('div', {
                        ref: barElRef,
                        class: ['mc-tabs__header-bar']
                    });
                }
            }

            return null;
        });

        const tabsHeaderVNode = computed(() => {
            // use IKey, ensure non-SpecificVNode element won't be rendered in header
            const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<MaybeTabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
            if (!maybeTabPanes || maybeTabPanes.length === 0) return null;
            activeTabName.value = activeTabName.value || (firstTabPane?.props?.name ?? '');

            return createVNode(
                'div',
                {
                    class: ['mc-tabs__header-scroll-content', headerClass?.value],
                    style: headerStyle?.value
                },
                maybeTabPanes.map(maybeTabPane => getTabVNode(maybeTabPane))
            );
        });

        expose({
            switchTo: handleBeforeTabSwitch,
            el: tabsElRef
        });

        return () =>
            createVNode(
                'div',
                {
                    ref: tabsElRef,
                    class: ['mc-tabs', `mc-tabs--${type.value}`],
                    style: cssVars.value
                },
                [
                    createVNode(
                        'div',
                        {
                            ref: headerElRef,
                            class: [
                                'mc-tabs__header',
                                {
                                    'mc-tabs__header--center': center.value,
                                    'mc-tabs__header--stretch': stretch.value,
                                    'mc-tabs__header--with-line': type.value === 'segment' || type.value === 'empty' ? false : showLine.value
                                },
                                type.value === 'bar' || type.value === 'segment' ? `mc-tabs__header--bar-${animation.value}` : ''
                            ]
                        },
                        [lineBarVNode.value, tabsHeaderVNode.value]
                    ),
                    createVNode(
                        'div',
                        {
                            class: ['mc-tabs__content', contentClass?.value],
                            style: contentStyle.value
                        },
                        slots.default ? flatten(slots.default(), tabIKey, true) : createCommentVNode('', true)
                    )
                ]
            );
    }
});
