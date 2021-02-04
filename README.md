# Umi Electron Template

![][version-url] [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![][license-url]

[version-url]: https://img.shields.io/github/v/release/arvinxx/umi-electron-template
[license-url]: https://img.shields.io/github/license/arvinxx/umi-electron-template

一个基于 umi 和 [umi-plugin-electron-builder](https://github.com/BySlin/umi-plugin-electron-builder) 的开发模板

![预览](https://gw.alipayobjects.com/zos/antfincdn/k7TRgZNHSJ/1bbf755c-a3bf-45bd-a3f8-64745a93f8b2.png)

## 特性

### 架构

- 基于 [umi-plugin-electron-builder][umi-plugin-electron-builder] 构建，享受 umi 生态全量开发能力；
- 采用 [electron-builder][electron-builder] 打包构建工具；
- 使用 Main 与 Renderer 双目录架构；

### 内置功能

- **样式框架**: 集成 TailwindCSS；
- **数据持久化**: 集成 sqlite3 作为本地数据库， TypeORM 作为 ORM；
- **签名公证**: 集成 macOS app 签名与公证，包含在 CI/CD 流程中；

### 开发体验

- 集成 [react-devtools][react-devtools] 与 [Redux Dev Tools][redux-devtools]；
- 基于 [Gitmoji Commit Workflow][gitmoji-commit-workflow], 实现自动化版本管理与发布；

<!-- url -->

[umi-plugin-electron-builder]: https://github.com/BySlin/umi-plugin-electron-builder
[react-devtools]: https://www.npmjs.com/package/react-devtools
[electron-builder]: https://www.electron.build/
[redux-devtools]: https://github.com/reduxjs/redux-devtools
[gitmoji-commit-workflow]: https://github.com/arvinxx/gitmoji-commit-workflow/

## License

[MIT](./LICENSE) ® Arvin Xu
