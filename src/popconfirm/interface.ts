import { PropType } from 'vue';
import { PopoverTrigger, PopoverBaseProps, popoverProps } from '../popover';

export type OnCancelImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export type OnConfirmImpl = () => Promise<boolean | undefined | void> | boolean | undefined | void;
export interface PopconfirmProps extends PopoverBaseProps {
    cancelText: string | null;
    confirmText: string | null;
    cancelDisabled: boolean;
    confirmDisabled: boolean;
    hideIcon: boolean;
    onCancel?: OnCancelImpl;
    onConfirm?: OnConfirmImpl;
}

export const popconfirmProps = {
    ...popoverProps,
    trigger: {
        type: String as PropType<PopoverTrigger>,
        default: 'click'
    },
    cancelText: {
        type: [String, Object] as PropType<PopconfirmProps['cancelText']>,
        default: '取消'
    },
    confirmText: {
        type: [String, Object] as PropType<PopconfirmProps['confirmText']>,
        default: '确认'
    },
    cancelDisabled: {
        type: Boolean as PropType<PopconfirmProps['cancelDisabled']>,
        default: false
    },
    confirmDisabled: {
        type: Boolean as PropType<PopconfirmProps['confirmDisabled']>,
        default: false
    },
    hideIcon: {
        type: Boolean as PropType<PopconfirmProps['hideIcon']>,
        default: false
    },
    onCancel: {
        type: Function as PropType<PopconfirmProps['onCancel']>,
        default: undefined
    },
    onConfirm: {
        type: Function as PropType<PopconfirmProps['onConfirm']>,
        default: undefined
    }
};
