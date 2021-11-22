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
