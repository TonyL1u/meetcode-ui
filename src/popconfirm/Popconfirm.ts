import { defineComponent, ref, toRefs, renderSlot, createVNode, createTextVNode, Fragment, mergeProps } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { getSlotFirstVNode } from '../_utils_';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';
import { McPopover, PopoverExposeInstance } from '../popover';
import { popconfirmProps } from './interface';

export default defineComponent({
    name: 'Popconfirm',
    props: popconfirmProps,
    setup(props, { slots }) {
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

        return () => {
            const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
            const mergedProps = mergeProps(props, {
                ref: popoverRef,
                class: 'mc-popconfirm'
            });
            console.log(mergedProps);

            return createVNode(McPopover, mergedProps, {
                default: () => renderSlot(slots, 'default'),
                content: () =>
                    createVNode(Fragment, null, [
                        createVNode(
                            'div',
                            {
                                class: 'mc-popconfirm__content'
                            },
                            [iconVNode, content.value ? (typeof content.value === 'string' ? createTextVNode(content.value) : content.value()) : null]
                        ),
                        getActionVNode()
                    ])
            });
        };
    }
});
