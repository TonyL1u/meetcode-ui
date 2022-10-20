# Input 输入框

## 演示

```demo
Basic
Borderless
Textarea
Size
Placeholder
Password
Clear
Disabled
Loading
WordCount
Addon
AutoSize
Event
InputGroup
Compose
Manually
TypingFocus
InputLimit
Valid
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| autosize | `boolean` | `false` | 自适应大小 |
| borderless | `boolean` | `false` | 隐藏边框 |
| clearable | `boolean` | `false` | 是否可清空 |
| composed | `boolean` | `false` | 是否使用组合输入框 |
| count | `number` | `2` | 组合输入框个数 |
| disabled | `boolean` | `false` | 是否禁用 |
| focus-on-typing | `boolean` | `false` | 是否在输入时自动聚焦 |
| input-limits | `InputLimitRule[]` | `undefined` | 进行输入限制时的规则 |
| loading | `boolean` | `false` | 开启加载中状态 |
| max-length | `number` | `undefined` | 最大字数限制 |
| max-rows | `number` | `undefined` | 文本域的最大行数 |
| min-rows | `number` | `undefined` | 文本域的最小行数 |
| password-visible | `'none' \| 'click' \| 'hover' \| 'mousedown'` | `'click'` | `type = password` 时，切换密码显示的方式 |
| placeholder | `InputPlaceholder \| InputPlaceholder[]` | `undefined` | 占位符 |
| resizable | `boolean` | `false` | `type = textarea` 时，是否允许手动调整大小 |
| rules | `InputValidRule[]` | `undefined` | 验证规则 |
| separator | `string \| string[]` | `undefined` | 组合输入框的分隔符 |
| size | `InputSize` | `'medium'` | 输入框尺寸 |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` | 输入框类型 |
| (v-model)value | `string \| string[]` | `undefined` | 选择器绑定的值 |
| word-count | `boolean` | `false` | 开启字数统计 |


## Event

|            名称            |                         类型                          |                   说明                   |
| :------------------------: | :---------------------------------------------------: | :--------------------------------------: |
|      on-update:value       | `(value: string \| string[], index?: number) => void` |          有绑定值，修改值时触发          |
|          on-focus          |              `(index?: number) => void`               |            组件获得焦点时触发            |
|          on-blur           |              `(index?: number) => void`               |            组件失去焦点时触发            |
|         on-change          | `(value: string \| string[], index?: number) => void` |             值改变后触发触发             |
|          on-input          | `(value: string \| string[], index?: number) => void` |               修改值时触发               |
|         on-select          |       `(value: string, index?: number) => void`       |              选中文本后触发              |
|          on-clear          |                     `() => void`                      | 设置 `clearable = true` ，清空内容后触发 |
| on-password-visible-change |             `(visible: boolean) => void`              |           密码可见性改变时触发           |

## Slot

|    名称     | 参数 |   说明   |
| :---------: | :--: | :------: |
| placeholder | `()` |  占位符  |
|   prepend   | `()` | 前置内容 |
|   prefix    | `()` |   前缀   |
|   suffix    | `()` |   后缀   |
|   append    | `()` | 后置内容 |

## Expose

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |


## 类型声明

```ts
export declare type InputPlaceholder = string | (() => RenderFunction);
export declare type InputLimitType = 'trim' | 'number' | 'not-special' | 'not-space';
export declare type InputLimitRule = InputLimitType | RegExp | ((value: string, event: Event) => boolean);
```

## Events

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |


## Slots

| 名称 | 参数 | 说明 |
| :---: | :---: | :---: |

