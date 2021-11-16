interface InitialCode {
    script: string;
    template: string;
}

const InitialCode: any = {
    code1: {
        script: `import { McPopover } from 'meetcode-ui'`,
        template: `<McPopover trigger="click" placement="right">
    <button>测试</button>
    <template #content>这是测试内容</template>
</McPopover>`
    },
    code2: {
        script: `import { McPopselect } from 'meetcode-ui';
import { ref } from 'vue';

const value = ref('');
const options = ref([
    {
        label: 'test1',
        value: 'test1'
    },
    {
        label: 'test2',
        value: 'test2',
        disabled: true
    },
    {
        label: 'test3',
        value: 'test3'
    }
]);`,
        template: `<McPopselect v-model:value="value" :options="options" trigger="click">
    <button>{{ value || '请选择' }}</button>
</McPopselect>`
    },
    test: {
        script: `const a = 1`,
        template: `<div>{{ a }}</div>`
    }
};

export default InitialCode;
