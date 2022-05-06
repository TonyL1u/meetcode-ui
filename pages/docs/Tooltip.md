<script setup>
import Basic from '@/tooltip/demos/DemoBasic.vue'
import { McTextLink } from 'meetcode-ui'
</script>

# Tooltip 文字提示

基于 `McPopover` ，简单的文字悬浮提示。

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

## Props

|  名称   |   类型   | 默认值 |     说明     |
| :-----: | :------: | :----: | :----------: |
| content | `string` |  `''`  | Tooltip 内容 |

更多 Props 请参考 <McTextLink to="Popover#props">Popover Props</McTextLink> 。

## Event

更多 Event 请参考 <McTextLink to="Popover#event">Popover Event</McTextLink> 。
