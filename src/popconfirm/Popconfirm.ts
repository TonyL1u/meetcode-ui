import { Ref, ref, renderSlot, createVNode, createTextVNode, Fragment, mergeProps, FunctionalComponent, watchEffect } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { getSlotFirstVNode } from '../_utils_';
import { AlertCircle as IconAlert } from '@vicons/ionicons5';
import { McPopover, PopoverBaseProps, PopoverExposeInstance } from '../popover';
import './style.scss';

interface Props extends PopoverBaseProps {
    content?: string;
    cancelText?: string | null;
    confirmText?: string | null;
    hideIcon?: boolean;
}

type Emit = {
    cancel: (cb: (flag?: boolean) => void) => void;
    confirm: (cb: (flag?: boolean) => void) => void;
};

const Popconfirm: FunctionalComponent<Props, Emit> = (props, { slots, attrs, emit }) => {
    const { content = '', cancelText = '取消', confirmText = '确认', hideIcon = false } = props;
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
        const showCancel = cancelText !== null;
        const showConfirm = confirmText !== null;
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
                                showCancel ? createVNode(NButton, { size: 'small', onClick: handleCancel }, { default: () => cancelText }) : null,
                                showConfirm ? createVNode(NButton, { size: 'small', type: 'primary', style: { 'margin-left': '8px' }, onClick: handleConfirm }, { default: () => confirmText }) : null
                            ])
                  ]
              )
            : null;
    };

    const iconVNode = hideIcon ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
    const popoverMergedProps = mergeProps(
        {
            ref: popoverRef,
            class: 'mc-popconfirm',
            trigger: 'click'
        },
        attrs
    );
    console.log(content);

    return createVNode(McPopover, popoverMergedProps, {
        default: () => renderSlot(slots, 'default'),
        content: () =>
            createVNode(Fragment, null, [
                createVNode(
                    'div',
                    {
                        class: 'mc-popconfirm__content'
                    },
                    [iconVNode, createTextVNode(content)]
                ),
                getActionVNode()
            ])
    });
};

Popconfirm.props = ['content', 'cancelText', 'confirmText', 'hideIcon'];
Popconfirm.emits = ['cancel', 'confirm'];
export default Popconfirm;
