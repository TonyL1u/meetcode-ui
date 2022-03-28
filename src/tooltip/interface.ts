import { PropType } from 'vue';
import { PopoverProps } from '../popover';

export interface TooltipProps {
    effect?: 'dark' | 'light';
}

export type TooltipMergedProps = TooltipProps & PopoverProps;

export const tooltipProps = {
    effect: {
        type: String as PropType<TooltipProps['effect']>,
        default: 'dark'
    }
};
