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
