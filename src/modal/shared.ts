import { reactive, watch } from 'vue';

export const modalStack = reactive<string[]>([]);

export function addModal(key: string) {
    modalStack.push(key);
}

export function removeModal(key: string) {
    const index = modalStack.findIndex(modalKey => modalKey === key);
    modalStack.splice(index, 1);
}
