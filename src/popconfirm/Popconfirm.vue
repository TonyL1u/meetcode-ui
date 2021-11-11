<script lang="ts" setup>
import { ref, toRefs, useSlots, renderSlot, createVNode, createTextVNode, Fragment, useAttrs, mergeProps } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { McPopover } from '..';
import { getSlotFirstVNode } from '../_utils_';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';

interface Props {
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
const popoverRef = ref();

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
                            showConfirm ? createVNode(NButton, { class: 'mc-ml-2', size: 'small', type: 'primary', onClick: handleConfirm }, { default: () => confirmText.value }) : null
                        ])
              ]
          )
        : null;
};

const Render = () => {
    const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, class: 'mc-mr-2 mc-text-yellow-500' }, { default: () => createVNode(IconAlert) });
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

<style lang="scss">
.mc-popconfirm {
    &__content {
        @apply mc-flex mc-items-center mc-text-gray-700;
        min-width: 110px;
    }

    &__action {
        @apply mc-flex mc-justify-end mc-mt-2;
    }
}
</style>
