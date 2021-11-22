<script lang="ts">
export default {
    name: 'Popconfirm'
};
</script>

<script lang="ts" setup>
import { Ref, ref, toRefs, useSlots, useAttrs, renderSlot, createVNode, createTextVNode, Fragment, mergeProps } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { getSlotFirstVNode } from '../_utils_';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';
import { McPopover, PopoverBaseProps, PopoverExposeInstance } from '../popover';
import './style.scss';

interface Props extends PopoverBaseProps {
    content?: string;
    cancelText?: any;
    confirmText?: any;
    hideIcon?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    content: '',
    cancelText: '取消',
    confirmText: '确认',
    hideIcon: false
});
const emit = defineEmits<{
    (e: 'cancel', cb: (flag?: boolean) => void): void;
    (e: 'confirm', cb: (flag?: boolean) => void): void;
}>();

const slots = useSlots();
const attrs = useAttrs();
const { content, cancelText, confirmText, hideIcon } = toRefs(props);
const popoverRef = <Ref<PopoverExposeInstance>>ref();

const handleCancel = () => {
    let callback!: boolean;
    emit('cancel', (flag: boolean = true) => {
        callback = flag;
    });
    if (callback === undefined || !callback) {
        popoverRef.value.hide();
    }
};
const handleConfirm = () => {
    let callback!: boolean;
    emit('confirm', (flag: boolean = true) => {
        callback = flag;
    });
    if (callback === undefined || !callback) {
        popoverRef.value.hide();
    }
};

const getActionVNode = () => {
    const showCancel = cancelText.value !== null;
    const showConfirm = confirmText.value !== null;
    const hasActionSlot = !!slots.action;
    const needActionBlock = showCancel || showConfirm || hasActionSlot;

    return needActionBlock
        ? createVNode(
              'div',
              {
                  class: 'mc-popconfirm__action'
              },
              [
                  hasActionSlot
                      ? renderSlot(slots, 'action')
                      : createVNode(Fragment, null, [
                            showCancel ? createVNode(NButton, { size: 'small', onClick: handleCancel }, { default: () => cancelText.value }) : null,
                            showConfirm ? createVNode(NButton, { size: 'small', type: 'primary', style: { 'margin-left': '8px' }, onClick: handleConfirm }, { default: () => confirmText.value }) : null
                        ])
              ]
          )
        : null;
};

const Render = () => {
    const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
    const popoverMergedProps = mergeProps(
        {
            ref: popoverRef,
            class: 'mc-popconfirm',
            trigger: 'click'
        },
        attrs
    );

    return createVNode(McPopover, popoverMergedProps, {
        default: () => renderSlot(slots, 'default'),
        content: () =>
            createVNode(Fragment, null, [
                createVNode(
                    'div',
                    {
                        class: 'mc-popconfirm__content'
                    },
                    [iconVNode, createTextVNode(content.value)]
                ),
                getActionVNode()
            ])
    });
};
</script>

<template>
    <Render />
</template>
