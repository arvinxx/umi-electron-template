# Umi Electron Template

![][version-url] [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![][license-url]

<!-- badge -->

[version-url]: https://img.shields.io/github/v/release/arvinxx/umi-electron-template
[license-url]: https://img.shields.io/github/license/arvinxx/umi-electron-template

一个基于 [umi][umi] 和 [umi-plugin-electron-builder][umi-plugin-electron-builder] 的开发模板

![预览](https://gw.alipayobjects.com/zos/antfincdn/k7TRgZNHSJ/1bbf755c-a3bf-45bd-a3f8-64745a93f8b2.png)

## 特性

### 架构

- 基于 [umi-plugin-electron-builder][umi-plugin-electron-builder] 构建，享受完整 [umi][umi] 开发生态；
- 采用 [electron-builder][electron-builder] 打包构建工具；
- 使用 Main 与 Renderer 双目录架构；
- 基于 [inversify][inversify] 实现 DI/IoC

### 内置功能

- **样式框架**: 集成 [TailwindCSS][tailwindcss]；
- **数据持久化**: 集成 [sqlite3][sqlite3] 作为本地数据库， [TypeORM][typeorm] 作为 ORM；
- **签名公证**: 集成 macOS App 签名与公证，包含在 CI/CD 流程中；

### 开发体验

- 集成 [react-devtools][react-devtools] 与 [Redux Dev Tools][redux-devtools]；
- 基于 [Gitmoji Commit Workflow][gitmoji-commit-workflow], 实现自动化版本管理与发布；

<!-- url -->

[umi]: https://umijs.org/
[umi-plugin-electron-builder]: https://github.com/BySlin/umi-plugin-electron-builder
[react-devtools]: https://www.npmjs.com/package/react-devtools
[electron-builder]: https://www.electron.build/
[redux-devtools]: https://github.com/reduxjs/redux-devtools
[gitmoji-commit-workflow]: https://github.com/arvinxx/gitmoji-commit-workflow/
[tailwindcss]: https://tailwindcss.com/
[sqlite3]: https://github.com/mapbox/node-sqlite3
[typeorm]: https://typeorm.io/#/
[inversify]: https://github.com/inversify/InversifyJS

## 快速上手

### 安装

通过 git 下载这个仓库到本地

然后通过 yarn 下载安装依赖

```bash
yarn
```

### 开发

通过以下命令启动渲染进程(默认端口：7777)

```bash
yarn start
```

### 构建

```bash
yarn build
```

构建文件会输出到 `release` 目录下：

```
release
├── builder-effective-config.yaml
├── bundled
│   ├── home.html
│   ├── index.html
│   ├── main.js
│   ├── main.js.map
│   ├── node_modules
│   ├── package.json
│   ├── static
│   ├── umi.css
│   └── umi.js
├── latest-mac.yml
├── mac
│   └── Umi Electron Template.app
├── umi-electron-template_setup_1.8.1.dmg
└── umi-electron-template_setup_1.8.1.dmg.blockmap

```

## 开发指南

详见 [开发指南](./docs/guide.md)

## License

[MIT](./LICENSE) ® Arvin Xu
