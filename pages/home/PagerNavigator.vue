<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { McIcon, useI18nController } from 'meetcode-ui';
import { ChevronBackSharp as IconPrev, ChevronForwardSharp as IconNext } from '@vicons/ionicons5';
import { componentNameMap } from '../site.config';
import type { MenuTab, Route } from '../menu';
import type { MenuOption } from 'meetcode-ui';

const props = defineProps<{ menu: MenuOption[]; menuKey: string; tab: MenuTab }>();
const { menu, menuKey, tab } = toRefs(props);
const router = useRouter();
const { current: siteLang } = useI18nController();
const allMenus = computed(() => (tab.value === 'components' ? menu.value.map(item => item.children!).flat() : menu.value));
const currentIndex = computed(() => allMenus.value.findIndex(item => item.key === menuKey.value));
const next = computed(() => allMenus.value[currentIndex.value + 1] ?? null);
const prev = computed(() => allMenus.value[currentIndex.value - 1] ?? null);
const getLabel = (type: 'prev' | 'next') => {
    const { label, extra } = type === 'prev' ? prev.value : next.value;
    const text = [componentNameMap[extra!.key], extra!.key];
    return tab.value === 'components' && siteLang.value === 'zh-CN' ? (type === 'prev' ? text.join(' ') : text.reverse().join(' ')) : label;
};
const switchTo = (type: 'prev' | 'next') => {
    const key = (type === 'prev' ? prev.value.key : next.value.key) as string;
    if (key) router.push(`/${siteLang.value}/${key}`);
};
</script>

<template>
    <div v-if="next || prev" class="mc-px-[18px] mc-py-7 mc-mx-auto mc-max-w-[768px] mc-flex mc-justify-between mc-w-full mc-box-border" :style="{ justifyContent: !prev ? 'flex-end' : !next ? 'flex-start' : '' }">
        <div v-if="prev" class="switcher prev" @click="switchTo('prev')">
            <div class="mc-flex mc-items-center mc-text-xs">
                <McIcon :size="12">
                    <IconPrev />
                </McIcon>
                Previous
            </div>
            <span class="mc-text-base mc-text-green-500 mc-capitalize">{{ getLabel('prev') }}</span>
        </div>
        <div v-if="next" class="switcher next" @click="switchTo('next')">
            <div class="mc-flex mc-items-center mc-text-xs">
                Next
                <McIcon :size="12">
                    <IconNext />
                </McIcon>
            </div>
            <span class="mc-text-base mc-text-green-500 mc-capitalize">{{ getLabel('next') }}</span>
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
