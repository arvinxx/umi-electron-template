import { getLogger } from '@/bridge';
import { createLogProxy } from '@/common';

const logger = getLogger('renderer');

console.trace = createLogProxy('trace', logger)(console.trace);
console.debug = createLogProxy('debug', logger)(console.debug);
console.info = createLogProxy('info', logger)(console.info);
console.error = createLogProxy('error', logger)(console.error);
