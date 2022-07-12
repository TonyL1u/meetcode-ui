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

如果想在多个场景下使用同一个模态框，可能需要在每一个使用到的地方都重新加入这段代码。而这段关于模态框的代码功能是完全独立的，因此可以将其完全抽离，更易于代码复用与维护。

## 演示

::: demo CodePreview=Basic,Test1

### 基础用法

通过 `McPopup()` 构造器创建一个弹窗实例，传入的参数可以是：Vue 组件、VNode 或 HTML 片段。

<Basic />
:::

::: demo CodePreview=ModalStyle,Test1

### 弹窗样式

显示时，可以调整弹窗样式。

更多 Props 请参考 <McTextLink to="Modal#props">Modal Props</McTextLink> 。

<ModalStyle />

> 关闭弹窗后，会自动销毁当前实例。如果不希望这样做，可以设置 `autoDestroy = false` 。

:::

::: demo CodePreview=Communicate,Test2

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

::: demo CodePreview=Plugins,Test3

### 插件

有时候可能需要在独立的 Vue 组件中使用诸如 `vue-router` 、 `pinia` 之类的插件型工具，由于 `Popup` 创建了一个新的 App 实例，因此源文件无法与上下文共享同一个插件实例。

```xml
<script lang="ts" setup>
import { useRoute } from 'vue-router';

// 这里可能会报错：injection "Symbol(router)" not found.
const { path } = useRoute();
</script>

<template>
    {{ path }}
</template>
```

可以通过以下两种方法解决：

1. 全局注册插件。注册后，在所有 `Popup` 实例中均可使用。
2. 手动注册插件。注册后，仅限当前实例可以使用。

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { PopupProvider } from 'meetcode-ui';

createApp(App).use(router).mount('#app');
// 1. 全局注册插件
PopupProvider.use(router).use(...);
```

<Plugins />
:::

## Type Declarations

```ts
export declare function McPopup<P extends Record<string, any>, E extends ObjectEmitsOptions>(source: Component | string, options?: PopupSourceOptions<P, E>): PopupInstance;
export declare interface PopupSourceOptions<P extends Record<string, any>, E extends ObjectEmitsOptions> {
    props?: {
        [K in keyof P]: Ref<P[K]> | P[K];
    };
    on?: E;
    plugins?: Plugin[];
    autoDestroy?: boolean;
}
export declare interface PopupInstance {
    show(): void;
    show<T extends PopupType>(type: T): void;
    show(config: PopupModalConfig & Record<string, any>): void;
    show<T extends PopupType>(type: T, config: (T extends 'modal' ? PopupModalConfig : PopupDrawerConfig) & Record<string, any>): void;
    hide: () => void;
    destroy: () => void;
    instance: Ref<ModalExposeInstance | DrawerExposeInstance | undefined | null>;
}
```
