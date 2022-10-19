import { reactive, computed } from 'vue';

const sharedStack = reactive<string[]>([]);

export function useSharedItems() {
    return {
        add(key: string) {
            sharedStack.push(key);
        },
        remove(key: string) {
            const index = sharedStack.findIndex(sharedKey => sharedKey === key);
            index > -1 && sharedStack.splice(index, 1);
        },
        topItem: computed(() => sharedStack[sharedStack.length - 1]),
        stack: sharedStack
    };
}
