<script lang="ts">
export default {
    name: 'Popconfirm'
};
</script>

<script lang="ts" setup>
import { ref, toRefs, useSlots, useAttrs, renderSlot, createVNode, createTextVNode, Fragment, mergeProps } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { getSlotFirstVNode } from '../_utils_';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';
import { McPopover, PopoverBaseProps, PopoverExposeInstance } from '../popover';
import type { OnCancelImpl, OnConfirmImpl } from './interface';

interface Props extends PopoverBaseProps {
    content?: string;
    cancelText?: string;
    confirmText?: string;
    cancelDisabled?: boolean;
    confirmDisabled?: boolean;
    hideIcon?: boolean;
    onCancel?: OnCancelImpl;
    onConfirm?: OnConfirmImpl;
}
const props = withDefaults(defineProps<Props>(), {
    content: '',
    cancelText: '取消',
    cancelDisabled: false,
    confirmText: '确认',
    confirmDisabled: false,
    hideIcon: false
});

const slots = useSlots();
const attrs = useAttrs();
const { content, cancelText, cancelDisabled, confirmText, confirmDisabled, hideIcon, onCancel, onConfirm } = toRefs(props);
const popoverRef = ref<PopoverExposeInstance>();

const handleCancel = async () => {
    if (onCancel?.value) {
        const { value: cancel } = onCancel;
        const callback = await cancel();

        if (!callback || callback === undefined) {
            popoverRef?.value?.hide();
        }
    } else {
        popoverRef?.value?.hide();
    }
};
const handleConfirm = async () => {
    if (onConfirm?.value) {
        const { value: confirm } = onConfirm;
        const callback = await confirm();

        if (!callback || callback === undefined) {
            popoverRef?.value?.hide();
        }
    } else {
        popoverRef?.value?.hide();
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
                            showCancel ? createVNode(NButton, { size: 'small', disabled: cancelDisabled.value, onClick: handleCancel }, { default: () => cancelText.value }) : null,
                            showConfirm ? createVNode(NButton, { size: 'small', type: 'primary', disabled: confirmDisabled.value, style: { 'margin-left': '8px' }, onClick: handleConfirm }, { default: () => confirmText.value }) : null
                        ])
              ]
          )
        : null;
};

const Render = () => {
    const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
    const mergedProps = mergeProps(
        {
            ref: popoverRef,
            class: 'mc-popconfirm',
            trigger: 'click'
        },
        attrs
    );

    return createVNode(McPopover, mergedProps, {
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
