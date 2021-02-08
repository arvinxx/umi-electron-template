# 框架结构

框架分为 Main 端和 Renderer 端，为 Two Package Structure。

```
root/
├── src
│  ├── common                     # 公用的相关文件(IPC Channel指令等)
│  ├── main                       # Main 端
│  └── renderer                   # Renderer 端
```

- **Main 端**: 为 Electron 主进程，是 Node 环境（一个 Chrome 浏览器）。可与系统环境交互，具有较大的运行权限。详细架构见 [Main 架构](./main.md)。
- **Renderer 端**: 为 Electron 的渲染进程，需要通过 `BrowserWindows` 开启后才可见。运行环境为 Browser（可以理解为普通网页）。无法接触到系统，需要通过 Main 端间接实现与系统的交互。详细架构见 [Renderer 架构](./renderer.md)。

## 技术选型

### Main 端

Electron + SQLite + TypeORM + inversify

### Renderer 端

Umi + React + antd ，开发语言使用 Typescript。
