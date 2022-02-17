import { computed, toRefs, renderSlot, createVNode, defineComponent } from 'vue';
import { getSlotFirstVNode, useColorFactory } from '../_utils_';
import { TextLinkType, TextLinkColorSet, textLinkProps } from './interface';
import * as CSS from 'csstype';

const BASE_COLOR_MAP: Record<TextLinkType, TextLinkColorSet> = {
    primary: {
        color: '#3b82f6'
    },
    success: {
        color: '#16a34a'
    },
    warning: {
        color: '#fb923c'
    },
    danger: {
        color: '#dc2626'
    },
    info: {
        color: '#6B7280'
    }
};

export default defineComponent({
    name: 'TextLink',
    props: textLinkProps,
    setup(props, { slots }) {
        const { type, to, underline, trigger, color, hoverColor, block, raw } = toRefs(props);

        const showUnderline = computed(() => {
            if (!underline.value) return '';

            switch (trigger.value) {
                case 'always':
                    return 'underline';
                case 'hover':
                    return 'underline-hover';
                default:
                    return '';
            }
        });
        const cssVars = computed<CSS.Properties>(() => {
            const compositeInputColor: TextLinkColorSet = {
                color: color.value || BASE_COLOR_MAP[type.value!].color
            };
            const {
                default: defaultColorSet,
                hover: hoverColorSet,
                active: activeColorSet,
                disabled: disabledColorSet
            } = useColorFactory<TextLinkColorSet>(compositeInputColor, {
                hover: [0, 0, 0, 0.12]
            });

            return {
                '--text-link-default-color': color.value || defaultColorSet.color,
                '--text-link-hover-color': hoverColor.value || hoverColorSet.color,
                '--text-link-active-color': activeColorSet.color,
                '--text-link-disabled-color': disabledColorSet.color
            };
        });

        return () => {
            const textContent = getSlotFirstVNode(slots.default)?.children ?? '';
            const isEmail = typeof textContent === 'string' && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(textContent);

            return createVNode(
                'a',
                {
                    class: ['mc-text-link', { 'mc-text-link--block': block.value }, showUnderline.value],
                    style: cssVars.value,
                    href: to.value || (!raw.value && isEmail ? `mailto:${textContent}` : '#')
                },
                [renderSlot(slots, 'default')]
            );
        };
    }
});
