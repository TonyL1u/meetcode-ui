import { defineComponent, onMounted, renderSlot, ref, provide, toRefs, computed, watch } from 'vue';
import { useThemeRegister, createElementVNode, createDirectives, PatchFlags } from '../_utils_';
import { menuIKey, menuInjectionKey, menuProps } from './interface';
import { createKeyTree, createMenu, findPath } from './src/utils';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { StyleValue } from 'vue';
import type { Key } from '../_utils_';

export default defineComponent({
    name: 'Menu',
    iKey: menuIKey,
    props: menuProps,
    emits: ['update:value', 'update:expandKeys'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Menu',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const keyTree = slots.default ? createKeyTree(slots.default()) : [];
        const { value: valueVM, expandKeys, disabled, indent, unique, collapsed, collapsedWidth, collapsedIconSize, horizontal, options } = toRefs(props);
        const internalExpandKeys = ref<Key[]>([]);
        const mergedExpandKeys = expandKeys.value ? expandKeys : internalExpandKeys;
        const menuUpdateKey = ref(0);
        const menuElRef = ref<HTMLElement>();
        const selfPadding = computed(() => indent.value! - 32);
        const cssVars = computed<StyleValue>(() => {
            return {
                '--menu-collapsed-width': collapsedWidth.value + 'px',
                '--menu-collapsed-icon-size': collapsedIconSize.value + 'px',
                '--menu-collapsed-padding': `0px ${(collapsedWidth.value! - collapsedIconSize.value!) / 2}px`
            };
        });

        // force rerender menu when options changed
        watch(options, () => {
            menuUpdateKey.value++;
        });

        const callUpdateValue = (value: Key) => {
            if (valueVM.value !== value) {
                emit('update:value', value);
            }
        };
        const callUpdateExpandKeys = (key: Key | Key[]) => {
            if (Array.isArray(key)) {
                mergedExpandKeys.value = key;
            } else if (mergedExpandKeys.value) {
                const index = mergedExpandKeys.value.findIndex(item => item === key);
                if (index > -1) {
                    mergedExpandKeys.value.splice(index, 1);
                } else {
                    mergedExpandKeys.value.push(key);
                }
            }

            emit('update:expandKeys', mergedExpandKeys.value);
        };

        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue,
            expandedKeys: mergedExpandKeys,
            updateExpandKeys: callUpdateExpandKeys,
            keyTree,
            options,
            padding: selfPadding,
            isDisabled: disabled,
            isUnique: unique,
            isCollapsed: collapsed,
            isHorizontal: horizontal
        });

        expose({
            el: menuElRef,
            expand(key: Key | Key[], autoSelect = false) {
                autoSelect && !Array.isArray(key) && callUpdateValue(key);
                const expandKeys = [...new Set((Array.isArray(key) ? key : [key]).map(key => findPath(keyTree, key) ?? []).flat())];
                callUpdateExpandKeys([...new Set([...mergedExpandKeys.value!, ...expandKeys])]);
            },
            collapseAll() {
                callUpdateExpandKeys([]);
            }
        });

        // main logic...
        return () =>
            createElementVNode(
                'ul',
                {
                    ref_key: 'menuElRef',
                    ref: menuElRef,
                    key: menuUpdateKey.value,
                    class: ['mc-menu', collapsed.value ? 'mc-menu--collapsed' : '', horizontal.value ? 'mc-menu--horizontal' : '', disabled.value ? 'mc-menu--disabled' : ''],
                    style: cssVars.value
                },
                [options.value ? createDirectives('v-for', options.value, option => createMenu(option)) : renderSlot(slots, 'default')],
                PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS,
                ['key']
            );
    }
});
