import { history } from 'umi';
import { isDev } from '../../common';

export const routeTo = (url: string) => {
  history.push(isDev ? url : `${url}.html`);
};
