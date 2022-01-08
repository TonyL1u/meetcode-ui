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
-   Popover trigger 设置为 follow 并且应用 move 模式时，hide 和 show 事件会触发多次，原因是 watch 没有做节流，导致进入和离开 trigger 时
