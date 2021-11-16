<script setup>
import Basic from '@/text-link/demos/DemoBasic.vue'
import Underline from '@/text-link/demos/DemoUnderline.vue'
import Email from '@/text-link/demos/DemoEmail.vue'
import EmailPlain from '@/text-link/demos/DemoEmailPlain.vue'
</script>

# TextLink 文字链接

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />
:::

::: demo codePreview=Underline

### 显示下划线

<Underline />
:::

::: demo codePreview=Email,EmailPlain

### 邮件链接

有时候可能想添加一个邮件跳转链接，当 TextLink 的内容是邮件链接时，会自动识别，点击<Email />，会打开你默认的本地邮箱应用。

若只是想展示文字，设置 `plain = true` 。点击<EmailPlain />，什么都不会发生。

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
