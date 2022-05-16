import { defineComponent, renderSlot, createVNode, toRefs, ref, Transition } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, menuItemGroupIKey, subMenuIKey, subMenuProps } from '../interface';
import { McIcon } from '../../icon';
import { ChevronDownOutline } from '@vicons/ionicons5';
import { mainCssr, lightCssr, darkCssr } from '../styles';

export default defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots }) {
        if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey)) {
            throw new Error('[McSubMenu]: McSubMenu must be placed inside McMenu or McMenuItemGroup.');
        }

        const { title } = toRefs(props);
        const isExpand = ref(true);

        function handleBeforeLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = `${el.offsetWidth}px`;
            } else {
                el.style.maxHeight = `${el.offsetHeight}px`;
            }
            void el.offsetWidth;
        }
        function handleLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = '0';
            } else {
                el.style.maxHeight = '0';
            }
            void el.offsetWidth;
            const { onLeave } = props;
            if (onLeave) onLeave();
        }
        function handleAfterLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = '';
            } else {
                el.style.maxHeight = '';
            }
            const { onAfterLeave } = props;
            if (onAfterLeave) onAfterLeave();
        }
        function handleEnter(el: HTMLElement): void {
            el.style.transition = 'none';
            if (props.width) {
                const memorizedWidth = el.offsetWidth;
                el.style.maxWidth = '0';
                void el.offsetWidth;
                el.style.transition = '';
                el.style.maxWidth = `${memorizedWidth}px`;
            } else {
                if (props.reverse) {
                    el.style.maxHeight = `${el.offsetHeight}px`;
                    void el.offsetHeight;
                    el.style.transition = '';
                    el.style.maxHeight = '0';
                } else {
                    const memorizedHeight = el.offsetHeight;
                    el.style.maxHeight = '0';
                    void el.offsetWidth;
                    el.style.transition = '';
                    el.style.maxHeight = `${memorizedHeight}px`;
                }
            }
            void el.offsetWidth;
        }
        function handleAfterEnter(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = '';
            } else {
                if (!props.reverse) {
                    el.style.maxHeight = '';
                }
            }
            props.onAfterEnter?.();
        }

        // main logic...
        return () =>
            createVNode('li', { class: 'mc-sub-menu' }, [
                createVNode('div', { class: 'mc-sub-menu-title', onClick: () => (isExpand.value = !isExpand.value) }, [
                    createVNode('span', { class: 'mc-sub-menu-title__content' }, [title.value]),
                    createVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, { default: () => createVNode(ChevronDownOutline) })
                ]),
                createVNode(
                    Transition,
                    { name: 'mc-menu-expand', onEnter: handleEnter, onAfterEnter: handleAfterEnter, onBeforeLeave: handleBeforeLeave, onLeave: handleLeave, onAfterLeave: handleAfterLeave },
                    {
                        default: () => (isExpand.value ? createVNode('ul', { class: 'mc-sub-menu-children' }, [renderSlot(slots, 'default')]) : null)
                    }
                )
            ]);
    }
});
