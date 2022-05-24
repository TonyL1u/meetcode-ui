<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { McIcon, useI18nController } from 'meetcode-ui';
import { ChevronBackSharp as IconPrev, ChevronForwardSharp as IconNext } from '@vicons/ionicons5';
import type { MenuTab, Route } from '../menu';

const props = defineProps<{ routes: Route[]; tab: MenuTab }>();
const { routes, tab } = toRefs(props);
const router = useRouter();
const route = useRoute();
const { current: siteLang } = useI18nController();
const currentIndex = computed(() => routes.value.findIndex(item => item.path === route.path));
const next = computed(() => routes.value[currentIndex.value + 1] ?? null);
const prev = computed(() => routes.value[currentIndex.value - 1] ?? null);
const getLabel = (type: 'prev' | 'next') => {
    const meta = type === 'prev' ? prev.value.meta : next.value.meta;
    const { title, chinese } = meta;
    return tab.value === 'components' && siteLang.value === 'zh-CN' ? (type === 'prev' ? [chinese, title].join(' ') : [chinese, title].reverse().join(' ')) : title;
};
const switchTo = (type: 'prev' | 'next') => {
    const path = type === 'prev' ? prev.value.path : next.value.path;
    router.push(path);
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
            <span class="mc-text-base mc-text-green-500">{{ getLabel('prev') }}</span>
        </div>
        <div v-if="next" class="switcher next" @click="switchTo('next')">
            <div class="mc-flex mc-items-center mc-text-xs">
                Next
                <McIcon :size="12">
                    <IconNext />
                </McIcon>
            </div>
            <span class="mc-text-base mc-text-green-500">{{ getLabel('next') }}</span>
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
