<script lang="ts" setup>
import { McSpace, McButton, McMessage, useThemeController } from 'meetcode-ui';

const { switchTheme, setTheme, current, onThemeChange } = useThemeController();
onThemeChange(theme => {
    McMessage.success({
        message: `切换至 ${theme} 模式`,
        card: true
    });
});
</script>

<template>
    <McSpace>
        <McButton @click="switchTheme">当前：{{ current }}</McButton>
        <McButton @click="setTheme('light')">亮色模式</McButton>
        <McButton @click="setTheme('dark')">暗色模式</McButton>
    </McSpace>
</template>
