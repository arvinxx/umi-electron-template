# Main 架构

与开发功能核心相关的结构如下 :

```
main
├── app                 # App 框架
├── models              # 数据模型
├── services            # 服务
├── views               # UI
├── utils               # 工具函数
├── ioc                 # IoC 容器
├── bootstrap.ts        # app 启动逻辑
└── main.ts             # main 端启动脚本
```

## `main.ts` 入口文件

这个脚本是 [umi-plugin-electron-builder][umi-plugin-electron-builder] 约定保留脚本 将启动方法在这个脚本中执行:

```ts
import { bootstrap } from './bootstrap';

bootstrap().catch(console.error);
```

## `bootstrap.ts` 启动方法

在 `bootstrap.ts` 中定义了启动方法　`bootstrap`，执行分为　`beforeInit`　和　`init` 两个阶段：

- `beforeInit`: 执行需要在 app 初始化前的一些操作 比如注册 `schema` 协议、注入容器的异步依赖(即数据库部分) 、锁定单实例等。
- `init`: 初始化容器，并调用 `App` 的 `init` 方法，执行服务、UI 的初始化。

## `app` 目录

app 目录下目前包含 三个容器对象 App Service 和 Window

```
app
├── App.ts              # App 容器
├── Service.ts          # 服务容器
├── View.ts             # 视窗容器
└── index.ts
```

- `App`: Electron 在 main 端的容器 包含所有必要对象, 通过 App 类来控制整个产品的生命周期；
- `Service`: Service 是服务容器对象 对产品提供所有需要的服务能力 例如翻译、登录注册、拉取新版本等；
- `View`: View 是视图容器对象 包含了所有和用户交互的对象： 窗口、菜单、托盘等。

### App 类

```typescript
class App {
  // 初始化方法
  constructor() {
    app.whenReady().then(() => {
      // 在这里调用服务和视图的 init 方法 实现服务和视图的初始化
      this.services.init();
      this.views.init();
    });

    // 其他 app 相关方法暂时都写在这里
    app.on('window-all-closed', () => {
      app.quit();
    });
  }

  // 视图容器
  views: View;

  // 服务容器
  services: Service;
}
```

### Service 类

在 `Service` 类中手动注入相应的服务类，然后在 `init` 方法中初始化上桥。

```typescript
class Service {
  /** 服务类 * */

  user: UserService;

  system: SystemService;

  device: DeviceService;

  init() {
    // 服务上桥 供 renderer 端 remote 调用
    global.services = {
      user: this.user,
      system: this.system,
      device: this.device,
    };
  }
}
```

TODO: 之后可能会替换成用 `ipc` 的方法 （相关见 [通信部分研究](../communication.md)）。

### View 类

结构和 `Service` 一样，在这里包含 `BrowserWindows` 、 `Menu` 和 `Tray` 类。

```typescript
class View {
  home: HomeWindow;

  init() {
    // 视窗上桥
    global.windows = {
      home: this.home,
    };
  }
}
```

## `ioc` 目录

该目录下包含了实现控制反转能力的模块， 使用 [inversify][inversify] 实现。
控制反转的好处在于只要引入相应的装饰器标识符，就可以自动把该对象引入到类中。如此一来，就直接拿到类的方法和属性了。

例如在 `UserService` 中注入 `TYPES.UserRepository` 就可以在 `model` 属性上拿到在数据库中的 `User` 对象。

PS：中间引入的过程在 `inversify.config.ts` 中

```typescript
class UserService {
  @inject(TYPES.UserRepository)
  private model: Repository<User>;
}
```

## `views` 目录

该目录下包含所有交互相关的能力: `BrowserWindows` `Menu` `Tray` `Shortcut` 等

- BrowserWindows: 窗口
- Menu: 菜单
- Tray: 托盘
- Shortcut: 快捷键

## `models` 目录

此目录包含数据库模型,本地数据库使用 SQLite3 , ORM 采用 [TypeORM][typeorm]

以 Status 为例:

```typescript
@Entity('Status')
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * 是否激活
   */
  @Column()
  active!: boolean;

  /**
   * ocr 是否可用
   */
  @Column()
  ocr!: boolean;

  /**
   * 设备是否可用 (超2台不可用)
   */
  @Column()
  device!: boolean;

  /**
   * 总使用次数
   */
  @Column()
  totalOcrCounts!: boolean;

  /**
   * 总翻译字符数
   */
  @Column()
  totalCharLength!: boolean;

  /**
   * 更新时间
   */
  @Column()
  updatedAt!: Date;
}
```

## `services` 目录

放 main 端服务能力, 大部分与系统交互的业务逻辑都放到 services 层中 , 例如校验有效性 翻译等等

[typeorm]: https://typeorm.io/#/
[inversify]: https://github.com/inversify/InversifyJS
[umi-plugin-electron-builder]: https://github.com/BySlin/umi-plugin-electron-builder
