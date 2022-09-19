import { defineComponent, ref, toRefs, renderSlot, createVNode, Fragment, mergeProps, PropType, onMounted } from 'vue';
import { getSlotFirstVNode, propsMergeSlots } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { omit } from 'lodash-es';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';
import { McPopover, PopoverExposeInstance, PopoverTrigger } from '../popover';
import { popoverProps, popoverEmits } from '../popover/interface';
import { McButton } from '../button';
import { McIcon } from '../icon';
import { PopconfirmMergedProps, popconfirmProps, popconfirmEmits } from './interface';
import { mainCssr } from './styles';

const defaultPropsOverride = {
    trigger: {
        type: String as PropType<PopoverTrigger>,
        default: 'click'
    }
};

export default defineComponent({
    name: 'Popconfirm',
    props: {
        ...popoverProps,
        ...popconfirmProps,
        ...defaultPropsOverride
    },
    emits: [...popoverEmits, ...popconfirmEmits],
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Popconfirm',
                main: mainCssr
            });
        });

        const { cancelText, cancelDisabled, confirmText, confirmDisabled, hideIcon, onCancel, onConfirm } = toRefs(props);
        const popoverRef = ref<PopoverExposeInstance>();

        const handleCancel = async () => {
            if (onCancel.value) {
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
            if (onConfirm.value) {
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
                                    showCancel ? createVNode(McButton, { size: 'small', ghost: true, disabled: cancelDisabled.value, onClick: handleCancel }, { default: () => cancelText.value }) : null,
                                    showConfirm ? createVNode(McButton, { size: 'small', type: 'success', disabled: confirmDisabled.value, style: { marginLeft: '8px' }, onClick: handleConfirm }, { default: () => confirmText.value }) : null
                                ])
                      ]
                  )
                : null;
        };

        return () => {
            const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(McIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
            const mergedProps = mergeProps(omit(props, Object.keys(popconfirmProps)), {
                ref: popoverRef,
                class: 'mc-popconfirm'
            });

            return createVNode(McPopover, mergedProps, {
                default: () => renderSlot(slots, 'default'),
                content: () =>
                    createVNode(Fragment, null, [
                        createVNode(
                            'div',
                            {
                                class: 'mc-popconfirm__content'
                            },
                            [iconVNode, propsMergeSlots<PopconfirmMergedProps, 'content'>(props, slots, 'content')]
                        ),
                        getActionVNode()
                    ])
            });
        };
    }
});
