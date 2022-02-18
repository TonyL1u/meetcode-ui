<script setup>
import Basic from '@/text-link/demos/DemoBasic.vue'
import Underline from '@/text-link/demos/DemoUnderline.vue'
import Email from '@/text-link/demos/DemoEmail.vue'
import EmailRaw from '@/text-link/demos/DemoEmailRaw.vue'
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

::: demo codePreview=Email,EmailRaw

### 邮件链接

当文字链接的内容为邮件地址时，点击 <Email /> ，会自动打开本地默认的邮箱应用。

若只是想展示文字，设置 `raw = true` 。点击 <EmailRaw /> ，什么都不会发生。

:::

## Props

|    名称     |                            类型                             |   默认值    |                                               说明                                                |
| :---------: | :---------------------------------------------------------: | :---------: | :-----------------------------------------------------------------------------------------------: |
|    type     | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |                                             链接类型                                              |
|     to      |                          `string`                           |    `'#'`    |                                             跳转链接                                              |
|  underline  |                          `boolean`                          |   `false`   |                                          是否显示下划线                                           |
|    block    |                          `boolean`                          |   `false`   |                                        是否显示为块级样式                                         |
|   trigger   |                    `'always' \| 'hover'`                    |  `always`   | 当 `underline = true` 时有效， `always` 表示一直显示下划线， `hover` 表示当鼠标悬浮时才显示下划线 |
|    color    |                          `string`                           | `'#10b981'` |                                          链接的默认颜色                                           |
| hover-color |                          `string`                           | `'#047857'` |                                        链接的鼠标悬浮颜色                                         |
|     raw     |                          `boolean`                          |   `false`   |                                         是否显示为纯文本                                          |

兼容原生 HTML `<a>` 元素属性，详细查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 。
