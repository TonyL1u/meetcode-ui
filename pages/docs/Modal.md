<script setup>
import Basic from '@/modal/demos/DemoBasic.vue'
import WrapperClick from '@/modal/demos/DemoWrapperClick.vue'
</script>

# Modal 模态框

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />

:::

::: demo codePreview=WrapperClick

### 遮罩事件

通过 `on-wrapper-click` 事件来处理点击遮罩层的回调。

设置 `wrapper-closable = false` 可以关闭遮罩层的点击事件。

<WrapperClick />

:::

## Props

| 名称  |              类型              |   默认值    |     说明     |
| :---: | :----------------------------: | :---------: | :----------: |
| size  |            `number`            | `undefined` |   图标尺寸   |
| color |            `string`            | `undefined` |     颜色     |
| spin  |           `boolean`            |   `false`   | 是否开启旋转 |
| speed | `'slow' \| 'normal' \| 'fast'` | `'normal'`  |   旋转速度   |
