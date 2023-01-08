import { history } from '@umijs/max';
import { isDev } from '@umi-electron-template/common';

export const routeTo = (url: string) => {
  history.push(isDev ? url : `${url}.html`);
};
