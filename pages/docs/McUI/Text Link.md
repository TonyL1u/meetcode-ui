<script setup>
import TextLinkDemo1 from '../../components/McUI-demo/TextLink/TextLinkDemo1.vue'
import TextLinkDemo2 from '../../components/McUI-demo/TextLink/TextLinkDemo2.vue'
import TextLinkDemo3 from '../../components/McUI-demo/TextLink/TextLinkDemo3.vue'
import TextLinkDemo4 from '../../components/McUI-demo/TextLink/TextLinkDemo4.vue'
</script>

# TextLink 文字链接

## 演示

::: demo codePreview=TextLinkDemo1

### 基础用法

<TextLinkDemo1 />
:::

::: demo codePreview=TextLinkDemo2

### 显示下划线

<TextLinkDemo2 />
:::

::: demo codePreview=TextLinkDemo3,TextLinkDemo4

### 邮件链接

有时候可能想添加一个邮件跳转链接，当 TextLink 的内容是邮件链接时，会自动识别，点击<TextLinkDemo3 />，会打开你默认的本地邮箱应用。

如果想取消这一功能，设置 `plain = true` 。点击<TextLinkDemo4 />，什么都不会发生。

:::

## Props

|    名称     |          类型          |   默认值    |                                               说明                                                |
| :---------: | :--------------------: | :---------: | :-----------------------------------------------------------------------------------------------: |
|     to      |        `string`        |    `''`     |                                             跳转链接                                              |
|  underline  |       `boolean`        |   `false`   |                                          是否显示下划线                                           |
|    block    |       `boolean`        |   `false`   |                                        是否显示为块级样式                                         |
|   trigger   | `'always' \| 'hover'`  |  `always`   | 当 `underline = true` 时有效， `always` 表示一直显示下划线， `hover` 表示当鼠标悬浮时才显示下划线 |
|    color    |        `string`        | `'#10b981'` |                                          链接的默认颜色                                           |
| hover-color |        `string`        | `'#047857'` |                                        链接的鼠标悬浮颜色                                         |
|   target    | `'_self' \| '_blank'`  |  `'_self'`  |                                           链接打开方式                                            |
|    type     | `'default' \| 'email'` | `'default'` |                                       用于设置邮箱跳转链接                                        |
