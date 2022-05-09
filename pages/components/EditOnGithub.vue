<script lang="ts" setup>
import { useAttrs } from 'vue';
import { McIcon, McTooltip } from 'meetcode-ui';
import { CreateOutline as IconEdit } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import { repository } from '../../package.json';

const handleEditOnGithub = () => {
    console.log(repository.url);
};
</script>

<template>
    <h1 class="main-heading mc-inline-flex mc-items-center">
        <slot></slot>
        <McTooltip content="在 Github 上编辑" placement="right">
            <McIcon :size="16" class="edit-icon mc-cursor-pointer mc-ml-2 mc-opacity-0 mc-transition-all" @click="handleEditOnGithub">
                <IconEdit />
            </McIcon>
        </McTooltip>
    </h1>
</template>

<style lang="scss" scoped>
.main-heading:hover {
    .edit-icon {
        opacity: 1;
    }
}
</style>
