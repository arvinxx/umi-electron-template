import 'reflect-metadata';
import container, { asyncBindings } from './inversify.config';

export default container;

export const loadContainerAsync = async () => {
  await container.loadAsync(asyncBindings);
  return container;
};
