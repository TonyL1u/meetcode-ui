import { reactive, watch } from 'vue';

export const modalStack = reactive<string[]>([]);

watch(modalStack, val => {
    // console.log(val);
});
