import { computed, renderSlot, createVNode, FunctionalComponent } from 'vue';
import { getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import './style.scss';
import * as CSS from 'csstype';

interface Props {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    to?: string;
    underline?: boolean;
    block?: boolean;
    trigger?: 'always' | 'hover';
    color?: string;
    hoverColor?: string;
    raw?: boolean;
}
const typeMap: any = {
    primary: {
        color: '#3B82F6',
        hoverColor: '#2563EB'
    },
    success: {
        color: '#10B981',
        hoverColor: '#059669'
    },
    warning: {
        color: '#F59E0B',
        hoverColor: '#D97706'
    },
    danger: {
        color: '#EF4444',
        hoverColor: '#DC2626'
    },
    info: {
        color: '#6B7280',
        hoverColor: '#4B5563'
    }
};

const TextLink: FunctionalComponent<Props> = (props: Props, { slots, attrs }) => {
    const { type = 'success', color, hoverColor, to = '', underline = false, block, trigger = 'always', raw = false } = kebabCaseEscape(props);
    const textColor: string = color ?? typeMap[type].color;
    const textHoverColor: string = hoverColor ?? typeMap[type].hoverColor;

    const showUnderline = computed(() => {
        if (!underline) return '';

        switch (trigger) {
            case 'always':
                return 'underline';
            case 'hover':
                return 'underline-hover';
            default:
                return '';
        }
    });

    const cssVars = computed<CSS.Properties>(() => {
        return {
            '--text-link-default-color': textColor,
            '--text-link-hover-color': textHoverColor
        };
    });

    const textContent = getSlotFirstVNode(slots.default)?.children ?? '';
    const isEmail = typeof textContent === 'string' && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(textContent);

    return createVNode(
        'a',
        {
            class: ['mc-text-link', { 'mc-text-link--block': block }, showUnderline.value],
            style: cssVars.value,
            href: to || (!raw && isEmail ? `mailto:${textContent}` : '')
        },
        [renderSlot(slots, 'default')]
    );
};

export default TextLink;
