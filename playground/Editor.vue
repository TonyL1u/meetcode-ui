<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useMonaco } from './logic/useMonaco';

const emit = defineEmits<(e: 'change', content: string) => void>();
const props = defineProps<{ language: string; value: string }>();

const target = ref();
const { onChange, setContent } = useMonaco(target, {
    language: props.language,
    code: props.value
});

watch(
    () => props.value,
    () => setContent(props.value)
);
onChange((content: string) => emit('change', content));
emit('change', props.value);
</script>

<template>
    <div ref="target" class="mc-h-full mc-w-full"></div>
</template>

<style>
.monaco-editor.vs-dark .mtk1 {
    color: #fff !important;
}
</style>
