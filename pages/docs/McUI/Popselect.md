<script setup>
import Basic from '@/popselect/demos/DemoBasic.vue'
import Multiple from '@/popselect/demos/DemoMultiple.vue'
import HeightLimit from '@/popselect/demos/DemoHeightLimit.vue'
import { McTextLink } from 'meetcode-ui'
</script>

# Popselect 弹出选择

基于 `McPopover` ，没有输入框的选择器。

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />
:::

::: demo codePreview=Multiple

### 多选

<Multiple />
:::

::: demo codePreview=HeightLimit

### 高度限制

选项过多时，可以为弹出框设置一个最大高度，列表内容超出该高度时就会滚动。

<HeightLimit />
:::

## Props

|    名称    |           类型           | 默认值  |         说明         |
| :--------: | :----------------------: | :-----: | :------------------: |
|  options   | `Array<PopselectOption>` |  `[]`   |         选项         |
|  multiple  |        `boolean`         | `false` |       是否多选       |
| max-height |         `number`         |  `300`  | 弹出框的最大高度(px) |

更多 Props 请参考 <McTextLink to="Popover#props">Popover Props</McTextLink> 。

## Event

|      名称       |                            类型                            |        说明        |
| :-------------: | :--------------------------------------------------------: | :----------------: |
| on-update:value | `(value: PopselectValue, option: PopselectOption) => void` | 选中的值改变时触发 |

更多 Event 请参考 <McTextLink to="Popover#event">Popover Event</McTextLink> 。

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
| default | `()` | 弹出框触发元素 |
