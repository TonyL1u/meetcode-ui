<template>
    <McSpace vertical :gap="0">
        <McProgress ref="circleProgress" type="circle" :duration="10000" :autoplay="false" animation />
        <McProgress ref="lineProgress" animation :duration="10000" :autoplay="false" :start="20" :end="50" />

        <McSpace>
            <McButton @click="handlePlay">PLAY</McButton>
            <McButton @click="handlePause">PAUSE</McButton>
            <McButton @click="handleRestart">RESTART</McButton>
            <McButton @click="handleReset">RESET</McButton>
            <McButton @click="handleSeekTime">SEEK TIME</McButton>
            <McButton @click="handleSeekPercentage">SEEK PERCENTAGE</McButton>
            <McButton @click="handleSeekProgress">SEEK PROGRESS</McButton>
        </McSpace>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McProgress, McButton, McSpace } from 'meetcode-ui';
import type { ProgressExposeInstance } from 'meetcode-ui';

const lineProgress = ref<ProgressExposeInstance>();
const circleProgress = ref<ProgressExposeInstance>();

const handlePlay = () => {
    lineProgress.value?.play();
    circleProgress.value?.play();
};
const handlePause = () => {
    lineProgress.value?.pause();
    circleProgress.value?.pause();
};
const handleRestart = () => {
    lineProgress.value?.restart();
    circleProgress.value?.restart();
};
const handleReset = () => {
    lineProgress.value?.reset();
    circleProgress.value?.reset();
};
const handleSeekTime = () => {
    lineProgress.value?.seekTime(2000);
    circleProgress.value?.seekTime(2000);
};
const handleSeekPercentage = () => {
    lineProgress.value?.seekPercentage(25);
    circleProgress.value?.seekPercentage(25);
};
const handleSeekProgress = () => {
    lineProgress.value?.seekProgress(90);
    circleProgress.value?.seekProgress(90);
};
</script>
