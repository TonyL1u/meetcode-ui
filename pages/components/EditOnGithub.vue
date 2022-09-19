<script lang="ts" setup>
import { toRefs } from 'vue';
import { McIcon, McTooltip, McPopup } from 'meetcode-ui';
import { CreateOutline as IconEdit, ReaderOutline } from '@vicons/ionicons5';
import UpdateRecord from './UpdateRecord.vue';
import { repository } from '../../package.json';

const props = defineProps<{ path: string; component: string }>();
const { path, component } = toRefs(props);
const handleEditOnGithub = () => {
    window.open(`${repository.url}/blob/develop/${path.value}`);
};
const handleOpenDrawer = () => {
    const { show, hide } = McPopup<{ component: string }>(UpdateRecord, {
        props: {
            component: component.value
        },
        on: {
            close() {
                hide();
            }
        }
    });
    show('drawer', { title: `${component.value} 更新记录`, size: '700px', headerStyle: { textTransform: 'capitalize' } });
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
