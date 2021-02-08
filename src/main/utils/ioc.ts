import { fluentProvide } from 'inversify-binding-decorators';

export const provideSingleton = (identifier: any) =>
  fluentProvide(identifier).inSingletonScope().done();
