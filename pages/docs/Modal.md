<script setup>
import Basic from '@/modal/demos/DemoBasic.vue'
import Position from '@/modal/demos/DemoPosition.vue'
import CustomStyle from '@/modal/demos/DemoCustomStyle.vue'
import Appear from '@/modal/demos/DemoAppear.vue'
import WrapperClick from '@/modal/demos/DemoWrapperClick.vue'
import Shortcut from '@/modal/demos/DemoShortcut.vue'
import BeforeLeave from '@/modal/demos/DemoBeforeLeave.vue'
import { McTextLink } from 'meetcode-ui'
</script>

# Modal 模态框

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />

:::

::: demo codePreview=Position

### 调整位置

模态框默认居中。通过 `position` 属性可以调整位置。

<Position />

:::

::: demo codePreview=CustomStyle

### 调整样式

<CustomStyle />

:::

::: demo codePreview=Appear

### 出现动画

默认情况下，模态框会从你打开它时的鼠标所在位置出现。

<Appear />

:::

::: demo codePreview=WrapperClick

### 遮罩事件

通过 `on-wrapper-click` 事件来处理点击遮罩层的回调。

设置 `wrapper-closable = false` 可以关闭遮罩层的点击事件。

<WrapperClick />

:::

::: demo codePreview=Shortcut

### 快捷键

打开模态框之后，按下键盘上的 `Esc` 键会关闭当前模态框。

设置 `shortcut-key` 可以自定义关闭模态框的快捷键，格式为 `Key1+Key2+...` 。

<Shortcut />

<McTextLink to="https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values" target="_blank" underline>键盘 Keycode 请参考。</McTextLink>

:::

::: demo codePreview=BeforeLeave

### Modal 关闭前的回调

提供钩子函数 `on-before-leave` 来控制 Modal 关闭前的行为。入参有 5 种值用于区分关闭模态框的行为：

`wrapper` ：点击遮罩层关闭。

`close` ：点击右上角关闭按钮关闭。

`shortcut` ：键盘快捷键关闭。

`cancel` ：点击取消按钮关闭。

`confirm` ：点击确认按钮关闭。

返回值为 `true` 时，会阻止模态框关闭。支持异步调用。

<BeforeLeave />

:::

## Props

| 名称  |              类型              |   默认值    |     说明     |
| :---: | :----------------------------: | :---------: | :----------: |
| size  |            `number`            | `undefined` |   图标尺寸   |
| color |            `string`            | `undefined` |     颜色     |
| spin  |           `boolean`            |   `false`   | 是否开启旋转 |
| speed | `'slow' \| 'normal' \| 'fast'` | `'normal'`  |   旋转速度   |
