# 通信

## 通信方式

在 `src/main/bridge` 和 `src/renderer/bridge` 中分别书写通信的方法

## 附录: 是否该使用 Remote 模块

在 [Electron’s ‘remote’ module considered harmful | by Jeremy Rose | Medium](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31) 中
Electron’s ‘remote’ module considered harmful | by Jeremy Rose | Medium
说 Remote 很慢，通信时会阻塞 UI。 一个测试是 remote 获取属性的效率是 local 的万分之一。
一个测试用例：

```js
// Main process
global.thing = {
rectangle: {
getBounds() { return { x: 0, y: 0, width: 100, height: 100 } }
setBounds(bounds) { /* ... */ }
}
}
// Renderer process
const thing = remote.getGlobal('thing')
const { x, y, width, height } = thing.rectangle.getBounds()
thing.rectangle.setBounds({ x, y, width, height: height + 100 })

```

上述代码会跑 9 个 ipc 流程。
