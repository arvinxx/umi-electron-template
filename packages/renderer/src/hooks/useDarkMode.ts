import { useLocalStorageState } from 'ahooks';

/**
 * DarkMode 需要的状态
 */
export const useDarkMode = () => {
  // DarkMode 可见
  const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>('theme', {
    defaultValue: 'light',
  });

  const switchDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, switchDarkMode };
};
