<template>
    <McSpace vertical :gap="0">
        <span>循环开始次数：{{ loopBeginTimes }}</span>
        <span>循环结束次数：{{ loopCompleteTimes }}</span>
        <McProgress
            ref="progress"
            animation
            :autoplay="false"
            :color="color"
            :loop="loop"
            :alternate="alternate"
            @begin="handleBegin"
            @pause="handlePause"
            @update="handleUpdate"
            @complete="handleComplete"
            @reset="handleReset"
            @restart="handleRestart"
            @seek="handleSeek"
            @loop-begin="loopBeginTimes++"
            @loop-complete="loopCompleteTimes++"
        />
        <McSpace>
            <McButton @click="progress?.play">播放</McButton>
            <McButton @click="progress?.pause">暂停</McButton>
            <McButton @click="progress?.restart">重新播放</McButton>
            <McButton @click="progress?.reset">重置</McButton>
            <McSwitch v-model:value="loop" checked-text="关闭循环" unchecked-text="开启循环" @switch="resetLoopRecord" />
            <McSwitch v-model:value="alternate" checked-text="关闭往返" unchecked-text="开启往返" @switch="resetLoopRecord" />
        </McSpace>
        <McSpace>
            <McButton @click="handleSeekTime">跳转至第 1 秒</McButton>
            <McButton @click="handleSeekPercentage">跳转至 50 %（进度条百分比）</McButton>
            <McButton @click="handleSeekProgress">跳转至 90 %（动画百分比）</McButton>
        </McSpace>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McProgress, McButton, McSpace, McSwitch, McMessage } from 'meetcode-ui';
import type { ProgressExpose, ProgressUpdatePayload } from 'meetcode-ui';

const progress = ref<ProgressExpose>();
const color = ref('');
const loop = ref(false);
const alternate = ref(false);
const loopBeginTimes = ref(0);
const loopCompleteTimes = ref(0);

const resetLoopRecord = () => {
    loopBeginTimes.value = 0;
    loopCompleteTimes.value = 0;
};
const handleSeekTime = () => {
    progress.value?.seekTime(1000);
};
const handleSeekPercentage = () => {
    progress.value?.seekPercentage(50);
};
const handleSeekProgress = () => {
    progress.value?.seekProgress(90);
};

const handleBegin = () => {
    McMessage.text('[Event begin]');
};
const handlePause = () => {
    McMessage.text('[Event pause]');
};
const handleUpdate = ({ progress }: ProgressUpdatePayload) => {
    if (progress >= 0 && progress < 50) {
        color.value = '#dc2626';
    } else if (progress >= 50 && progress < 75) {
        color.value = '#fb923c';
    } else {
        color.value = '#16a34a';
    }
};
const handleComplete = () => {
    McMessage.text('[Event complete]');
};
const handleReset = () => {
    McMessage.text('[Event reset]');
    resetLoopRecord();
};
const handleRestart = () => {
    McMessage.text('[Event restart]');
    resetLoopRecord();
};
const handleSeek = () => {
    McMessage.text('[Event seek]');
    resetLoopRecord();
};
</script>
