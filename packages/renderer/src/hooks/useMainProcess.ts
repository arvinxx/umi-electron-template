/**
 * 打开外部链接
 */
export const useShell = () => {
  return {
    openUrl: (url: string) => {
      console.log(url);
    },
  };
};
