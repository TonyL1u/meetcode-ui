<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { McIcon, useI18nController } from 'meetcode-ui';
import { ChevronBackSharp as IconPrev, ChevronForwardSharp as IconNext } from '@vicons/ionicons5';
import { componentNameMap } from '../site.config';
import type { MenuTab } from '../menu';
import type { MenuOption } from 'naive-ui';

const props = defineProps<{ menu: MenuOption[]; currentKey: string; tab: MenuTab }>();
const { menu, currentKey, tab } = toRefs(props);
const router = useRouter();
const { current: siteLang } = useI18nController();
const currentIndex = computed(() => menu.value.findIndex(item => item.key === currentKey.value));
const next = computed(() => menu.value[currentIndex.value + 1] ?? null);
const prev = computed(() => menu.value[currentIndex.value - 1] ?? null);
const switchNext = () => {
    if (next.value) router.push(`/${siteLang.value}/${next.value.key}`);
};
const switchPrev = () => {
    if (prev.value) router.push(`/${siteLang.value}/${prev.value.key}`);
};
</script>

<template>
    <div v-if="next || prev" class="mc-px-[18px] mc-py-7 mc-mx-auto mc-max-w-[768px] mc-flex mc-justify-between mc-w-full mc-box-border" :style="{ justifyContent: !prev ? 'flex-end' : !next ? 'flex-start' : '' }">
        <div v-if="prev" class="switcher prev" @click="switchPrev">
            <div class="mc-flex mc-items-center mc-text-xs">
                <McIcon :size="12">
                    <IconPrev />
                </McIcon>
                Previous
            </div>
            <span class="mc-text-base mc-text-green-500">{{ tab === 'components' && siteLang === 'zh-CN' ? `${prev.label} ${componentNameMap[prev.label.toLowerCase()]}` : prev.label }}</span>
        </div>
        <div v-if="next" class="switcher next" @click="switchNext">
            <div class="mc-flex mc-items-center mc-text-xs">
                Next
                <McIcon :size="12">
                    <IconNext />
                </McIcon>
            </div>
            <span class="mc-text-base mc-text-green-500">{{ tab === 'components' && siteLang === 'zh-CN' ? `${componentNameMap[next.label.toLowerCase()]} ${next.label}` : next.label }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.switcher {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &.prev {
        align-items: flex-start;
    }

    &.next {
        align-items: flex-end;
    }
}
</style>
