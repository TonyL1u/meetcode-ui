<script lang="ts" setup>
import { McSpace, McButton, McMessage, useThemeController } from 'meetcode-ui';

const { switchTheme, setTheme, current, onThemeChange } = useThemeController();
onThemeChange(theme => {
    McMessage.success({
        message: `Switch to ${theme} mode`,
        card: true
    });
});
</script>

<template>
    <McSpace>
        <McButton @click="switchTheme">current：{{ current }}</McButton>
        <McButton @click="setTheme('light')">Light Mode</McButton>
        <McButton @click="setTheme('dark')">Dark Mode</McButton>
    </McSpace>
</template>
