# 开发指南

## 框架设计思想

框架的设计思想为 MVC Services 方式

### Main

框架整体上分为 MVC、common、services 和 process 四大结构
services 自己封装了一些诸如消息通知，http 请求，用 localStorage 本地化存储等服务，开发者可以自行扩展，并按需引用，

process 中主要针对主进程和渲染进程分别写了 MainProcessHelper 和 RendererProcessHelper，

用来辅助主进程和渲染进程的通信，同时

### Renderer

### common

common 中有 Logger，Config，Router 三个组件，分别用于日志，配置和路由。

## 框架约定

### Renderer

采用 umi 的约定

## 框架引用的第三方组件

- log4js 日志 https://www.npmjs.com/package/log4js
