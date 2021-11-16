<script setup>
import Basic from '@/popconfirm/demos/DemoBasic.vue'
import Event from '@/popconfirm/demos/DemoEvent.vue'
import Icon from '@/popconfirm/demos/DemoIcon.vue'
import Action from '@/popconfirm/demos/DemoAction.vue'
// import { McTextLink } from '../../McUI'
</script>

# Popconfirm 弹出确认

基于 `McPopover` ，弹出来的确认框。

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />
:::

::: demo codePreview=Event

### 事件

通过 `on-cancel` 和 `on-confirm` 事件来处理取消和确认按钮点击后的回调。

可以通过回调函数控制在点击按钮之后不关闭弹出框。

<Event />
:::

::: demo codePreview=Icon

### 图标

<Icon />
:::

::: demo codePreview=Action

### 操作

<Action />
:::

## Props

|     名称     |       类型       |  默认值  |                 说明                 |
| :----------: | :--------------: | :------: | :----------------------------------: |
|   content    |     `string`     |   `''`   |              弹出框内容              |
| cancel-text  | `string \| null` | `'取消'` | 取消按钮文字，设置为 `null` 隐藏按钮 |
| confirm-text | `string \| null` | `'确认'` | 确认按钮文字，设置为 `null` 隐藏按钮 |
|  hide-icon   |    `boolean`     | `false`  |             是否隐藏图标             |

<!-- 更多 Props 请参考 <McTextLink to="Popover#props">Popover Props</McTextLink> 。 -->

## Event

|    名称    |                   类型                    |        说明        |
| :--------: | :---------------------------------------: | :----------------: |
| on-cancel  | `(cb?: (flag?: boolean) => void) => void` | 点击取消按钮的回调 |
| on-confirm | `(cb?: (flag?: boolean) => void) => void` | 点击确认按钮的回调 |

<!-- 更多 Event 请参考 <McTextLink to="Popover#event">Popover Event</McTextLink> 。 -->

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
|  icon   | `()` |   自定义图标   |
| default | `()` | 弹出框触发元素 |
| action  | `()` | 自定义操作内容 |
