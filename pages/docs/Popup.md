<script setup>
import Basic from '@/popup/demos/DemoBasic.vue'
import ModalStyle from '@/popup/demos/DemoModalStyle.vue'
import Communicate from '@/popup/demos/DemoCommunicate.vue'
import AppearPosition from '@/popup/demos/DemoAppearPosition.vue'
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

通过 `McPopup()` 构造器创建一个弹窗实例，传入的参数可以是：Vue 组件、VNode 或 HTML 片段。

```ts
import { McPopup } from 'meetcode-ui';
import Test from './Test.vue';

const instance = McPopup(Test);
```

调用 `instance.show()` 显示弹窗。

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

上下文和源组件之间支持通过 `props` 和 `emit` 通信。传入一个 `ref()` 或 `reactive()` 变量来使 props 获得响应性。

<Communicate />

> 通过 `McPopup<P, E>` 的两个范型参数获得更好的类型推断和限制。
>
> 第二个范型参数 `E` 只能通过 `type` 声明。
>
> props 传入 `ref()` 变量时，为了与源组件中的 Props 类型声明保持一致，第一个范型参数 `P` 中可以直接声明该变量的**原始类型**。当然，写成 `Ref<T>` 也是完全正确并合理的。

:::

### 出现位置

::: demo codePreview=AppearPosition

使用 `McPopup()` 创建弹窗时，由于 dom 节点是动态挂载的，因此 `McModal` 内部无法在调用 `instance.show()` 时获取当前鼠标位置。

如果仍想让弹窗从打开它时的鼠标所在位置出现，可以动手传入当前鼠标位置，并设置 `appearFromCursor = true` 。

<AppearPosition />
:::
