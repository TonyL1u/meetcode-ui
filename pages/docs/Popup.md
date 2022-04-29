<script setup>
import Basic from '@/popup/demos/DemoBasic.vue'
import ModalStyle from '@/popup/demos/DemoModalStyle.vue'
import Communicate from '@/popup/demos/DemoCommunicate.vue'
import Test1 from '@/popup/demos/Test1.vue'
import Test2 from '@/popup/demos/Test2.vue'
import { McTextLink } from 'meetcode-ui'
</script>

# Popup 弹窗

基于 `McModal` ，指令式的模态框。

在使用模态框时，需要在代码中装载一段模态框的代码。例如：

```xml
<template>
    <McButton type="success" ghost @click="show = true">打开</McButton>

    <!-- Use Modal -->
    <McModal v-model:show="show" title="模态框">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton } from 'meetcode-ui';

const show = ref(false);
</script>
```

这段关于模态框的代码功能是完全独立的，因此可以将其完全抽离，更易于代码维护。

## 演示

::: demo codePreview=Test1,Basic

### 基础用法

引入 `*.vue` 文件

```xml
<template>
    <h1>Hello World!</h1>
</template>
```

创建实例

```ts
import { McPopup } from 'meetcode-ui';
import Test from './Test.vue';

const instance = McPopup(Test);
```

显示

```ts
instance.show();
```

<Basic />
:::

### 弹窗样式

::: demo codePreview=ModalStyle

显示时，可以调整弹窗样式。

更多 Props 请参考 <McTextLink to="Modal#props">Modal Props</McTextLink> 。

<ModalStyle />

:::

### 通信

::: demo codePreview=Test2,Communicate

上下文和源组件之间支持通过 `props` 和 `emit` 通信。

通过 `McPopup<P, E>` 的两个范型参数来获得更好的类型限制和推断。

<Communicate />
:::
