<script setup>
import Basic from '@/checkbox/demos/DemoBasic.vue'
import CustomValue from '@/checkbox/demos/DemoCustomValue.vue'
import Group from '@/checkbox/demos/DemoGroup.vue'
import GroupLayout from '@/checkbox/demos/DemoGroupLayout.vue'
import Max from '@/checkbox/demos/DemoMax.vue'
import Event from '@/checkbox/demos/DemoEvent.vue'
import SelectAll from '@/checkbox/demos/DemoSelectAll.vue'
</script>

# Checkbox 复选框

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />

:::

::: demo codePreview=CustomValue

### 自定义值

<CustomValue />

:::

::: demo codePreview=Group

### 选项组

通过 `options` 或默认插槽来添加复选框。支持混合使用。

<Group />

:::

::: demo codePreview=GroupLayout

### 布局

在选项组内灵活使用布局。

<GroupLayout />

:::

::: demo codePreview=Max

### 最大可选数量

最多可以选择 2 个。

<Max />

:::

::: demo codePreview=Event

### 事件

<Event />

:::

::: demo codePreview=SelectAll

### 全选

`McChekcboxGroup` 暴露出了 `selectAll` 、 `clear` 事件和 `status` 属性。

`indeterminate` 可以设置半选图标。

<SelectAll />

:::

## Props

### Checkbox Props

|      名称      |   类型   | 默认值 |     说明     |
| :------------: | :------: | :----: | :----------: |
| (v-model)value | `string` |  `''`  | Tooltip 内容 |
