<script lang="ts" setup>
import { computed } from 'vue';
import { McButton, McSpace, McInput, McIcon } from 'meetcode-ui';
import { FlashOutline, Search, PricetagOutline } from '@vicons/ionicons5';

const props = defineProps<{ component: string }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const ChangeLog = [
    {
        version: '0.0.37',
        date: '2022-07-12',
        logs: [
            {
                component: 'popup',
                type: '🐛 Bug修复',
                description: '修复了在独立Vue组件中无法使用 vue-router 等插件的问题'
            }
        ]
    }
];
const logs = computed(() => ChangeLog[0].logs.filter(log => log.component === props.component));

const handleClick = () => {
    emit('close');
};
</script>

<template>
    <div class="mc-flex mc-flex-col mc-h-full">
        <div class="mc-flex-1 mc-flex mc-flex-col">
            <div class="mc-flex">
                <McInput style="width: 200px; margin-right: 16px" placeholder="选择版本">
                    <template #suffix>
                        <McIcon :icon="FlashOutline" />
                    </template>
                </McInput>
                <McInput placeholder="选择变更类型">
                    <template #suffix>
                        <McIcon :icon="Search" />
                    </template>
                </McInput>
            </div>
            <div v-if="logs.length > 0" class="mc-mt-5">
                <McSpace vertical :gap="4">
                    <div class="mc-text-2xl mc-font-medium">0.0.37</div>
                    <div>2022-07-12</div>
                    <div v-for="log in logs">
                        <div class="mc-text-lg mc-font-medium">{{ log.type }}</div>
                        <ul>
                            <li>{{ log.description }}</li>
                        </ul>
                    </div>
                </McSpace>
            </div>
            <div v-else class="mc-flex-1 mc-flex mc-items-center mc-justify-center mc-text-xl mc-text-gray-400">
                <McIcon class="mc-mr-2" :icon="PricetagOutline" :size="20" />
                暂无数据
            </div>
        </div>
        <McSpace justify="flex-end">
            <McButton ghost @click="handleClick">取消</McButton>
            <McButton type="success" @click="handleClick">确定</McButton>
        </McSpace>
    </div>
</template>
