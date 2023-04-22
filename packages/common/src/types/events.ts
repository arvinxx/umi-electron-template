/**
 * main -> renderer 的广播事件
 */
export interface MainEvents {
  initDatabase: 'loading' | 'failed' | 'success';
}

/**
 * renderer -> main 的请求事件
 */
export interface RendererEvents {
  /**
   * SystemService
   * 检查可用性
   */
  '/system/check-accessibility': boolean;

  /**
   * 添加新用户
   */
  '/user/add': any;
  /**
   * 查找所有用户
   */
  '/user/find-all': any;
}
