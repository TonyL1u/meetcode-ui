<template>
    <McSpace vertical :gap="0">
        <McProgress ref="circleProgress" type="circle" :duration="30000" animation />
        <McProgress ref="lineProgress" animation :duration="30000" :autoplay="false" :start="20" :end="50" @begin="handleBegin" @update="handleUpdate" @complete="handleComplete" @seek="handleSeek" />

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
import type { ProgressUpdatePayload, ProgressExpose } from 'meetcode-ui';

const lineProgress = ref<ProgressExpose>();
const circleProgress = ref<ProgressExpose>();
const percentage = ref(0);
const color = ref('green');
// const gaugePercentage = ref(-1);

const handlePlay = () => {
    lineProgress.value?.play();
    circleProgress.value?.play();
    percentage.value += 10;
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

const handleBegin = () => {
    console.log('begin');
};
const handleUpdate = ({ progress }: ProgressUpdatePayload) => {
    // console.log(percentage);
    // if (progress > 20) color.value = 'red';
    // else color.value = 'green';
};
const handleComplete = () => {
    console.log('complete');
};
const handleSeek = () => {
    console.log('seek');
};

// onMounted(() => {
//     Anime({
//         targets: gaugePercentage,
//         value: [0, 100],
//         autoplay: true,
//         loop: true,
//         duration: 10000,
//         easing: 'linear'
//     });
// });
</script>

<style lang="scss">
.gauge {
    background: conic-gradient(#16a34a var(--gauge-percentage), rgba(235, 235, 235, 1) 0);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: auto;
        left: auto;
        border-radius: 50%;
        height: 85%;
        width: 85%;
        background: #fff;
        z-index: 1;
    }
}
</style>
