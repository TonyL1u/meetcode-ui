2021-11-19

-   Monaco 编辑器 ts 功能支持的不好
-   打包后的 css 文件怎么传到 iframe 里
-   meetcode-ui 的类型支持

2021-11-20

-   Monaco 如何支持 TailwindCss
-   怎么创建响应式的 CSS props 变量？
-   h() 和 createVNode() 有什么区别，参数怎么传？
-   引用组件时，怎么透传 props？
-   对比 sfc 和 tsx 写法，各有优劣

2021-11-21

-   Popover content 热更新有问题
-   在 script setup 里用 Render 写法会有问题，因此决定改用纯 ts 写，使用 Functional Component 和 defineComponent

2021-11-22

-   尝试用 defineComponent + ts 写组件，体验太差（告辞），还是决定用 script setup
-   这样写只在开发侧会有热更新问题，遇到其他的问题在特别作兼容
-   Popover 的箭头会覆盖在弹出框上面，暂未解决

2021-11-23

-   script setup 内容书写顺序：import、Props、props(withDefaults)、emit、useSlots & useAttrs、toRefs、inject、ref、computed、watch、function、provide、nextTick、onMounted(...)、VNode 、Render、expose
-   button 要做一个 content slot，允许自定义内容
-   目标：自由定义所有样式，不需要写额外的选择器

2021-11-24

-   事件如果当作 props，用 kebabCase ；如果当作 emits，用 : 分割
-   把 Popconfirm 的 onCancel 和 onConfirm 事件变成 props，用返回值来控制弹出框是否在点击按钮后关闭
-   Popselect 和 Popconfirm 组件从 Popover 继承过来的 props 没有类型提示，但实际会生效
-   getSlotFirstVNode 重载有问题

2021-11-25

-   怎么把 iKey 属性加到 VNodeTypes 里
-   渲染 children 的 slot 时，总是会报类型错误

2021-11-27

-   动态添加 tab 失效
-   tabPane 的 lazy load 怎么做？相当于首次加载用 v-if，之后 v-show
-   如果 tab 外面被其他元素包裹，例如 tooltip、popover 等，怎么正确渲染到 tabs header 上

2021-11-30

-   Popover 关闭和显示默认有 100ms 的延迟。离开 trigger 100ms 之后，Popover 会默认消失，也有 100ms 的延迟，在 100ms 内如果再进入 Popover 的话，Popover 又会重新显示
-   tab 的 transition 属性会导致在更新 line bar 的位置时会有一个明显的过渡效果，看起来像是卡了

2021-12-01

-   如果一个 props 的类型是 CSSProperties | string，ts 编译会报错
-   使用 McTab 组件总是报错，重启项目之后正常，原因不明

2021-12-02

-   props 的定义可以使用运行时声明和类型声明，简单的 props 直接使用类型声明，复杂的 props 使用运行时声明
-   使用类型声明来定义 props 时，如果只有 CSSProperties，编译和类型推导均正常，但是 CSSProperties | string 就会编译报错
-   在线编辑功能在生产环境存在几个问题：1.lodash-es 报错找不到；2.css 导入有问题

2021-12-03

-   props 如果支持传入 VNode，类型应该定义为 () => VNodeChild

2021-12-06

-   如果先定义一个 options 对象，再把这个对象传入 Message，修改 Message()的返回值后，options 对象也会被改变
-   @vue/vue3-jest 对应 jest@27，但是测试 SFC 时会报错
-   Message 通过 api 调用时，第一个参数传字符串，第二个参数传配置项时，视图无法响应传入参数的修改来动态修改
-   Popover 暴露出的 el 可以用 ref 代替
-   通过 Message() 创建的实例无法注入 close 和 el
-   Message 打包报类型错误 `semantic error TS7031: Binding element 'expose' implicitly has an 'any' type.` ，是由于使用了 defineExpose 导致的，原因不明

2021-12-07

-   异步关闭最后一个 Message 时，会有 300ms 的延迟来置空 MessageReactiveList，如果此时有新的 Message 生成，300ms 后再执行 destroyAll ，会连带新生成的 Message 一起销毁

2021-12-08

-   在 transition-group 中使用 VNode 直接渲染，过渡效果有问题，并且插入会报错报错
-   在 VNode 中使用 ref，transition 过渡效果消失
-   销毁 message 时有 bug

2021-12-09

-   使用 transition-group 并添加 tag 时，最后一个元素消失的位置会出现偏移；如果不添加 tag，并且外层包裹的元素设置 display: flex ，元素消失时的位置不正确

2021-12-11

-   考虑在 MessageOptions 中传入 ref 响应式变量，这样可以直接响应式修改 options
-   所有的 Props 如果可以传入 className，类型应该规定为 `string | { [key: string]: boolean } | Array<string | { [key: string]: boolean }>`

2021-12-14

-   向下 provide 数据时，要保证每个数据都是响应式的，不能传 raw value

2021-12-15

-   CheckboxGroup 向下提供了一个更新 internalDisabled 属性的 bus 用于更新 max 可选数量，如果这个时候新增了一个 Checkbox，

2021-12-27

-   使用 vue script setup 语法来写组件的话存在两个问题：1.因为在 script setup 中使用了类型声明来定义 props，导致打包时的类型推断不准确；2.在 `.vue` 文件中写组件， props 提示缺失
-   组件中有的属性可以不传，然后会导致一些样式不会被渲染出来，但是这些原本会被渲染的元素的相邻元素可能有 margin 等属性导致会有一些空白的地方

2021-12-28

-   Popselect 改成 ts 之后，调用 popover 的 hide 方法，必须放在宏任务（sto、rAF）里面才能生效，原因未知

2021-12-31

-   如果组件有 value 双向绑定的功能，应该注意把 emit 和值改变拆开
-   Checkbox 和 CheckboxGroup 需要新增对异常 value 参数的处理，以及考虑是否在不传 value 的时候也可以触发 emit 事件

2022-01-07

-   用 gsap/Flip 来做 message 的动画，会有一个问题：新增 message 的速度过快，会导致新增的 message 样式出现问题

2022-01-08

-   Popover 的 follow 边界检测不准确，有时候还是有问题
-   Popover trigger 设置为 follow 并且应用 move 模式时，hide 和 show 事件会触发多次，原因是 watch 时没有做节流，导致进入和离开 trigger 时回调函数被多次执行了
-   CheckboxGroup 的 clear 事件有点问题，不生效

2022-01-11

-   Popover 的触发元素太小，导致箭头位置无法与触发元素对齐
-   Popover 内容样式设置了 `overflow: hidden` 后，箭头会消失

2022-01-12

-   Popover 的 trigger 元素设置为 button，并且禁用该 button（设置 disable）的话，由于无法触发 button 相关事件导致 Popover 无法正常显示

2022-01-15

-   Popover follow 的 move 模式，鼠标在元素内部快速移动时，偶尔会重复触发 show 和 hide 事件，原因暂时未知

2022-01-16

-   Button 自定义颜色的时候，怎么自动生成 hover 和 active 的颜色

2022-01-19

-   useColorFactory 的类型逻辑有问题
-   Icon 在类上添加的颜色会被 inherit 覆盖

2022-01-20

-   在 Button 的宽度发生变化时，怎么给它添加一个动画？考虑抽离 transition 组件

2022-02-20

-   Button Group 应该添加一个组的点击事件

2022-02-21

-   Popover 里面如果嵌套了 Popover（Popconfirm、Popselect）并且外层 Popover 的 trigger 设置为 click，在点击内层的 Popover 内容时，外层的 Popover 会被关闭

2022-02-24

-   Gird 组件，如果不指定 rows 属性，会默认为 `repeat(1, 1fr)`，这样写会存在 bug

2022-03-01

-   通过点击 wrapper 或键盘快捷键关闭当前 Modal 并且在其 onBeforeLeave 事件中打开一个新的 Modal 时会有 bug，导致无法打开新的 Modal

2022-03-30

-   Modal 设置 `show-header` 和 `show-footer` 都为 false 时，内容高度设置 100% 无效

2022-04-01

-   Popover 里如果嵌套了另外一个 Popover，当鼠标移到内部嵌套的 Popover 时，两个 Popover 都会消失
-   所有的弹出类组件都有同一个问题，点击外面判断不准确
-   有涉及 z-index 弹层的不能写死，需要动态修改

2022-04-05

-   如果设置 Popover 主体的 overflow 设为 `hidden` 或 `auto` ，箭头会被隐藏

2022-04-29

-   使用 Popup 弹窗，显示时无法获取鼠标指着位置，导致出现动画位置不准确

2022-04-30

-   在 Popup 中使用 message 会报错
-   Modal 中嵌套 Modal 时，最后一个 Modal 关闭时，stack 中的实例没有清除，导致无法关闭

2022-05-03

-   在传入 Popup 的 vue 文件中使用 vue-router4 的 `useRoute()` 和 `useRouter()` Api 报错

2022-05-07

-   Tabs position 属性设置为 absolute，样式有问题
-   如果 Tabs 里没有 TabPane，应该不渲染 content
-   Popselect 的 options 传入普通变量会报错

2022-05-09

-   自动生成的菜单项顺序无法控制

2022-05-11

-   Safari 正则报错，是因为使用了 `import.meta.globEager()`

2022-05-16

-   从首页切换到其他 tab，会有一个闪动，怀疑是因为，tab 的值改变了，但是 route 的值还没改导致的（这两个值修改是同步的）
-   路由切换逻辑不太合理，跟 tab 强绑定，现在是通过 tab 影响路由，应该反过来，通过路由的改变来影响 tab 的切换

2022-05-18

-   Menu 的 `expand-keys` 不能加 `v-model` 修饰符（原因未知）
-   Modal 的 `onUpdate:show` 事件无法触发 Modal 出现事件
-   数组 emits 里如果是以 `update:` 开头用于 `v-model` 绑定的事件，变量名不能用 `-` 分隔，要采用驼峰格式。例如，不能写成 `update:expand-keys` ，要写成 `update:expandKeys` ，否则无法触发该事件。

2022-05-22

-   Menu 的 group title 利用伪元素进行 hover 背景色，设置`z-index`会导致文字被覆盖

2022-05-23

-   Menu 样式写的比较复杂，需要进行优化

2022-06-09

-   Popover 的 default slot 的 VNode 加上 PatchFlags 后无法弹出

2022-06-15

-   Menu 在水平样式下的禁用状态样式不对

2022-06-20

-   Menu 通过 options 生成时，修改 options 里的 label 字段之后视图无法更新，暂时通过添加 key 来强制重新渲染

2022-07-06

-   InputGroup 内的 Input 框，如果添加了验证状态，右边框会显示不出来
-   Input clear 之后失焦无法触发 change 事件
-   Input 进行输入验证时，对同一种触发方式多次校验，出现的 message 会发生闪烁

2022-07-08

-   每一个涉及到 Popover 弹出框的组件，都需要提供一个 props 用于控制是否使用 teleport

2022-09-17

-   在 `onThemeChange` 里使用 `McMessage` 会报错，原因未知

2022-09-18

-   `McPopconfirm` 如果设置了 `trigger = manual` ，点击 action 按钮无法关闭
