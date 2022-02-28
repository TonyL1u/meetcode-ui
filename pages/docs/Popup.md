<script setup>
import Basic from '@/popup/demos/DemoBasic.vue'
</script>

# Popup 弹窗

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />

:::

## Props

| 名称  |              类型              |   默认值    |     说明     |
| :---: | :----------------------------: | :---------: | :----------: |
| size  |            `number`            | `undefined` |   图标尺寸   |
| color |            `string`            | `undefined` |     颜色     |
| spin  |           `boolean`            |   `false`   | 是否开启旋转 |
| speed | `'slow' \| 'normal' \| 'fast'` | `'normal'`  |   旋转速度   |
