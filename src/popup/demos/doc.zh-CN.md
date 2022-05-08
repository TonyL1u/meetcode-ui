<script setup>
import Demos from './zh-CN'
import { McTextLink } from 'meetcode-ui'
const {Basic, ModalStyle, Communicate, AppearPosition, Drawer} = Demos
</script>

@@@ meta Component=popup,Lang=zh-CN

# Popup 弹窗

基于 `McModal` 和 `McDrawer` ，指令式的模态框（抽屉）。

在使用模态框或抽屉时，会在代码中装载一段额外的代码：

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

::: demo CodePreview=Test1,Basic

### 基础用法

通过 `McPopup()` 构造器创建一个弹窗实例，传入的参数可以是：Vue 组件、VNode 或 HTML 片段。

<Basic />
:::

::: demo CodePreview=ModalStyle

### 弹窗样式

显示时，可以调整弹窗样式。

更多 Props 请参考 <McTextLink to="Modal#props">Modal Props</McTextLink> 。

<ModalStyle />

:::

::: demo CodePreview=Test2,Communicate

### 通信

上下文和源组件之间支持通过 `props` 和 `emit` 通信。传入一个 `ref()` 或 `reactive()` 变量来使 props 获得响应性。

<Communicate />

> 通过 `McPopup<P, E>` 的两个范型参数获得更好的类型推断和限制。
>
> 第二个范型参数 `E` 只能通过 `type` 声明。
>
> props 传入 `ref()` 变量时，为了与源组件 `defineProps<P>` 中的类型声明保持一致，可以在第一个范型参数 `P` 中直接声明该变量的**原始类型**。

:::

::: demo CodePreview=AppearPosition

### 出现位置

使用 `McPopup()` 创建弹窗时，由于 dom 节点是动态挂载的，因此 `McModal` 内部无法在调用 `instance.show()` 时获取当前鼠标位置。

如果仍想让弹窗从打开它时的鼠标所在位置出现，可以动手传入当前鼠标位置，并设置 `appearFromCursor = true` 。

<AppearPosition />
:::

::: demo CodePreview=Drawer

### 抽屉

`show()` 方法默认会打开一个模态框。如果想以抽屉形式打开弹窗，可以在第一个参数中传入字符串 `'drawer'` ，并通过第二个参数控制抽屉样式。

<Drawer />
:::

## Type Declarations

```ts
export declare function McPopup<P extends Record<string, any>, E extends ObjectEmitsOptions>(source: Component | string, options?: PopupSourceOptions<P, E>): PopupInstance;

export declare interface PopupInstance {
    show(): void;
    show<T extends PopupType>(type: T): void;
    show(config: PopupModalConfig): void;
    show<T extends PopupType>(type: T, config: T extends 'modal' ? PopupModalConfig : PopupDrawerConfig): void;
    hide: () => void;
    instance: Ref<ModalExposeInstance | DrawerExposeInstance | undefined>;
}
```

@@@
