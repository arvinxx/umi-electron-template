import 'reflect-metadata';
import container, { asyncBindings } from './inversify.config';

export default container;
export { default as TYPES } from './types';

export const loadAsync = async () => {
  await container.loadAsync(asyncBindings);
  return container;
};
