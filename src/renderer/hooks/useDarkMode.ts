import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';

/**
 * DarkMode 需要的状态
 */
export const useDarkMode = () => {
  // DarkMode 可见
  const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>(
    'theme',
    'light',
  );

  const switchDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('theme', theme!);
  }, [theme]);

  return { theme, switchDarkMode };
};
