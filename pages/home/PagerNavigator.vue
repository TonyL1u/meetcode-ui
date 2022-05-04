<script lang="ts" setup>
import { computed } from 'vue';
import { McIcon, McButton } from 'meetcode-ui';
import { ChevronBackSharp as IconPrev, ChevronForwardSharp as IconNext } from '@vicons/ionicons5';
import { usePageSwitch } from '../utils';

const { switchNext, switchPrev, next, prev, current } = await usePageSwitch();
const showPrev = computed(() => !!(prev.value && prev.value.name && prev.value.path !== '/404'));
const showNext = computed(() => !!(next.value && next.value.name && next.value.path !== '/404'));
const showPager = computed(() => current.value && current.value.path !== '/404' && (showPrev.value || showNext.value));
</script>

<template>
    <div v-if="showPager" class="mc-px-2 mc-pt-3 mc-pb-7 mc-mx-auto mc-max-w-[768px] mc-flex mc-justify-between mc-w-full mc-box-border" :style="{ justifyContent: !showPrev ? 'flex-end' : !showNext ? 'flex-start' : '' }">
        <McButton v-if="showPrev" render="link" @click="switchPrev">
            <template #icon>
                <McIcon :size="14">
                    <IconPrev />
                </McIcon>
            </template>
            {{ prev!.name }}
        </McButton>
        <McButton v-if="showNext" render="link" icon-right @click="switchNext">
            <template #icon>
                <McIcon :size="14">
                    <IconNext />
                </McIcon>
            </template>
            {{ next!.name }}
        </McButton>
    </div>
</template>
