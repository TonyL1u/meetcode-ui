<script setup>
import TabsDemo1 from '../../components/McUI-demo/Tabs/TabsDemo1.vue'
import TabsDemo6 from '../../components/McUI-demo/Tabs/TabsDemo6.vue'
</script>

# 需求

## 优化头部标签生成逻辑

## 头部标签数量溢出增加左右切换箭头

# 问题

## 父组件 Tabs 如何获取子组件的 slot ？

在时用 `McTabs` 时，可以在 `McTabPane` 中传入具名 slot 来控制对应标签显示的内容，例如：

```xml
<McTabs>
    ...
    <McTabPane tab-label="该属性设置无效" name="finished">
        <template #tab>
            <NIcon>
                <IconCheck />
            </NIcon>
            已结束
        </template>
        已结束
    </McTabPane>
    ...
</McTabs>
```

效果如下：

::: demo
<TabsDemo6 />
:::

由于 `name=tab` 的 slot 是定义在子组件 `McTabPane` 中的，但是要应用到父组件 `McTabs` 中。由于 `McTabPane` 是通过 slot 传入 `McTabs` 中的，在 Vue3 setup 语法中访问子组件的 slot 需要在父组件的 template 中使用 `$slot` 变量先获取到 `McTabPane` ，再获取到 `McTabPane` 的 slot。

```xml
<template>
    ...
    <div ref="tabsElRef">
        // 这里使用了 $slot
        <div v-for="{ children, props } in flatten($slots.default!(), tabPaneIdentificationKey)">
            <Vnode :vnode="render(children, props)" />
        </div>
    </div>
    ...
</template>
```

## 如何过滤 McTabs 中的非 McTabPane 元素？

Tabs 标签页的使用方法为：用 `<McTabs></McTabs>` 包裹若干个 `<McTabPane></McTabPane>`，例如：

```xml
<McTabs>
    <McTabPane tab-label="全部" name="all">全部</McTabPane>
    <McTabPane tab-label="未开始" name="unused">未开始</McTabPane>
    <McTabPane tab-label="进行中" name="inProgress">进行中</McTabPane>
    <McTabPane tab-label="已结束" name="finished">已结束</McTabPane>
    <McTabPane tab-label="已归档" name="archived">已归档</McTabPane>
</McTabs>
```

效果如下：

::: demo
<TabsDemo1 />
:::

但是有时候可能会出现在 `McTabs` 放入非 `McTabPane` 元素的情况，此时要保证该元素不被渲染到头标签上，做法是为 `McTabPane` 创建一个独立标识 `Symbol('McTabPane')` ，在遍历 slot 渲染头部标签时，只有当前元素的标识与 `Symbol('McTabPane')` 相同时，才会进行渲染。

## McTabs 内使用 v-for 循环渲染 McTabPane 时，怎么保证内容的正确渲染？
