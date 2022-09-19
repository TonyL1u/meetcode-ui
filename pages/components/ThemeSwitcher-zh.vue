<script lang="ts" setup>
import { McSpace, McButton, McSwitch, McIcon, McMessage, useThemeController } from 'meetcode-ui';
import { Moon, Sunny } from '@vicons/ionicons5';

const { switchTheme, setTheme, current, onThemeChange, isDark } = useThemeController();
onThemeChange(theme => {
    // McMessage.success({
    // message: `切换至 ${theme} 模式`
    // card: true
    // });
});
</script>

<template>
    <McSpace>
        <McSwitch v-model:value="current" checked-value="dark" unchecked-value="light" checked-text="Dark" unchecked-text="Light">
            <template #checked-icon>
                <McIcon :icon="Moon" />
            </template>
            <template #unchecked-icon>
                <McIcon :icon="Sunny" />
            </template>
        </McSwitch>
        <McButton @click="switchTheme">当前：{{ current }}</McButton>
        <McButton @click="setTheme('light')">亮色模式</McButton>
        <McButton @click="setTheme('dark')">暗色模式</McButton>
    </McSpace>
</template>
