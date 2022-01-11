import { computed, toRefs, renderSlot, createVNode, defineComponent } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import { TextLinkColorMap, textLinkProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'TextLink',
    props: textLinkProps,
    setup(props, { slots }) {
        const { type, to, underline, trigger, color, hoverColor, block, raw } = toRefs(props);
        const typeMap: TextLinkColorMap = {
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

        const textColor: string = color?.value ?? typeMap[type.value!].color;
        const textHoverColor: string = hoverColor?.value ?? typeMap[type.value!].hoverColor;
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
            return {
                '--text-link-default-color': textColor,
                '--text-link-hover-color': textHoverColor
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
