import { shell } from '@/bridge';

/**
 * 打开外部链接
 */
export const useShell = () => {
  return {
    openUrl: (url: string) => {
      shell.openExternal(url).then();
    },
  };
};
