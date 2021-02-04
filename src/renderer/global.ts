import { getLogger } from '@/bridge';

/**
 * 创建日志代理方法
 * @param logLevel 日志级别
 * @param mainLogger 日志对象
 * @return {function}
 */
const createLogProxy = (logLevel: string, mainLogger: Main.Logger) => (
  fn: Function,
) => (...args: any) => {
  fn(...args);
  mainLogger[logLevel](...args);
};

const logger = getLogger('renderer');

console.trace = createLogProxy('trace', logger)(console.trace);
console.debug = createLogProxy('debug', logger)(console.debug);
console.info = createLogProxy('info', logger)(console.info);
console.error = createLogProxy('error', logger)(console.error);
