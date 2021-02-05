## 框架设计思想

框架的设计思想为 MVC 加 Service 方式，组合而成。 MVC 是老生常谈，但是我这里似乎不能完全意义上的称做 MVC，只是有 MVC 结构罢了，（没错 MVC 也是松耦合且可以按需调整），Model 用来专注干数据或者业务该干的事情，（你也可以放在 Controller 做，没人阻止你这么干）。

MainProcessHelper 也负责在 electron 启动时启动渲染窗口。

### Main

框架整体上分为 MVC、common、service 和 process 四大结构
service 自己封装了一些诸如消息通知，http 请求，用 localStorage 本地化存储等服务，开发者可以自行扩展，并按需引用，

process 中主要针对主进程和渲染进程分别写了 MainProcessHelper 和 RendererProcessHelper，

用来辅助主进程和渲染进程的通信，同时

### Renderer

### common

common 中有 Logger，Config，Router 三个组件，分别用于日志，配置和路由。

## 框架约定

### Renderer

采用 umi 的约定

文件夹中，控制器写在 Controller 文件夹中，建议命名为类似于【DemoController】,控制器代码需要在 html 用通过 script 标签的 src 属性引入，在 Controller 中可以按需通过 require 引入服务及 common 组件，在 Controller 中可以使用 jquery，或者开发者可以自行扩展。

建议： 在每个 Controller 中引用 BaseController，可以方便使用 openNewWindow 方法 在每个 Controller 中引用 RendererProcessHelper，可以方便的像主进程通知消息，方便的注册回调函数。

## 框架引用的第三方组件

- log4js 日志 https://www.npmjs.com/package/log4js
