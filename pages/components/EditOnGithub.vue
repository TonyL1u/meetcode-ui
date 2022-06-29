<script lang="ts" setup>
import { McIcon, McTooltip, McPopup } from 'meetcode-ui';
import { CreateOutline as IconEdit, ReaderOutline } from '@vicons/ionicons5';
import UpdateRecord from './UpdateRecord.vue';
import { repository } from '../../package.json';

const props = defineProps<{ path: string }>();
const handleEditOnGithub = () => {
    window.open(`${repository.url}/blob/develop/${props.path}`);
};
const handleOpenDrawer = () => {
    // return;

    const { show, hide } = McPopup(UpdateRecord, {
        on: {
            close() {
                hide();
            }
        }
    });
    show('drawer', { title: '更新记录', size: '600px' });
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
        <McTooltip content="更新记录" placement="right">
            <McIcon :size="14" class="reader-icon mc-transition-all" @click="handleOpenDrawer">
                <ReaderOutline />
            </McIcon>
        </McTooltip>
    </h1>
</template>

<style lang="scss" scoped>
.main-heading {
    position: relative;

    &:hover .edit-icon {
        opacity: 1;
    }

    &:hover .reader-icon {
        opacity: 1;
    }
}
.edit-icon,
.reader-icon {
    cursor: pointer;
    opacity: 0;
    position: relative;
    bottom: 8px;
}

.edit-icon {
    margin-left: 8px;
}

.reader-icon {
    margin-left: 5px;
}
</style>
