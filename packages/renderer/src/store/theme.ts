import { ThemeMode } from 'antd-style';
import { create } from 'zustand';

export const useThemeStore = create(() => ({ themeMode: 'auto' as ThemeMode }));
