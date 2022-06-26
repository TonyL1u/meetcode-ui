<script lang="ts" setup>
import { McIcon, McTooltip } from 'meetcode-ui';
import { CreateOutline as IconEdit } from '@vicons/ionicons5';
import { repository } from '../../package.json';

const props = defineProps<{ path: string }>();
const handleEditOnGithub = () => {
    window.open(`${repository.url}/blob/develop/${props.path}`);
};
</script>

<template>
    <h1 class="main-heading">
        <slot></slot>
        <McTooltip content="在 Github 上编辑此页" placement="right">
            <McIcon :size="16" class="edit-icon mc-transition-all" @click="handleEditOnGithub">
                <IconEdit />
            </McIcon>
        </McTooltip>
    </h1>
</template>

<style lang="scss" scoped>
.edit-icon {
    cursor: pointer;
    margin-left: 8px;
    opacity: 0;
    position: relative;
    bottom: 8px;
}
.main-heading:hover {
    .edit-icon {
        opacity: 1;
    }
}
</style>
