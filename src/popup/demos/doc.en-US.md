# Popup

Derived from `McModal` and `McDrawer` , create a modal box(drawer) through service.

Normally, an additional piece of code is loaded into your program when using modal boxes or drawers:

```xml
<template>
    <McButton type="success" ghost @click="show = true">Open</McButton>

    <!-- Use Modal -->
    <McModal v-model:show="show" title="Modal">Something...</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton } from 'meetcode-ui';

const show = ref(false);
</script>
```

Such code about the modal box is independent, so it can be completely separated from the code so that you can easier to maintain your program.

## Demos

::: demo CodePreview=Test1,Basic

### Basic

Create a pop-up instance through the `McPopup()` constructor. The parameters passed in can be Vue component, VNode or HTML fragment.

<Basic />
:::

::: demo CodePreview=ModalStyle

### Pop-up Style

You can adjust the pop-up style whenever you want to show it.

For more props, please refer to <McTextLink to="Modal#props">Modal Props</McTextLink> 。

<ModalStyle />

> After closing the popup, the current instance will be automatically destroyed. If you don't want to do this, please set `autoDestroy = false` .

:::

::: demo CodePreview=Test2,Communicate

### Communicate

Context and source components support communication through `props` and `emit` . Pass in a `ref()` or `reactive()` variable to make props responsive.

<Communicate />

> Better type inference and restriction can be obtained through the two generics of `McPopup<P, E>`.
>
> The second generics `E` can only be declared through `type` .
>
> When props passes in the `ref()` variable, in order to be consistent with the type declaration in the source component `defineProps<P>`, you can directly declare the **original type** of the variable in the first generics `P` .

:::

::: demo CodePreview=AppearPosition

### Appear From

When using `McPopup()` to create a pop-up instance, because the DOM node is dynamically mounted, `McModal` cannot get the current cursor position when call `instance.show()`.

If you still want the pop-up to appear from the mouse position when it is opened, you can manually pass in the current mouse position and set `appearFromCursor = true` .

<AppearPosition />
:::

::: demo CodePreview=Drawer

### Drawer

The `show()` method will open a modal box by default. If you want to open a drawer, you can pass in the string `'drawer'` into the first parameter and control the drawer style through the second parameter.

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
