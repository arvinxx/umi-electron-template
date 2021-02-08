import { HomeWindow } from '@/views';
import { inject } from 'inversify';

import { logAfter, logBefore, provideSingleton } from '@/utils';

@provideSingleton(View)
export class View {
  /** 窗口类 * */

  @inject(HomeWindow)
  home!: HomeWindow;

  /**
   * 处理所有视窗初始化
   */
  @logBefore('[视图]初始化...')
  @logAfter('[视图]初始化完成!')
  init() {
    // 窗口上桥
    global.windows = {
      home: this.home,
    };
  }
}
