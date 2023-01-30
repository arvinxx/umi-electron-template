import { useThemeStore } from '@/store/theme';
import { Outlet } from '@umijs/max';
import { App } from 'antd';
import { ThemeProvider } from 'antd-style';
import 'antd/dist/reset.css';
import type { FC } from 'react';

import useStyles from './style';

const BaseLayout: FC = () => {
  const { themeMode } = useThemeStore();

  const { styles } = useStyles();

  const switchDarkMode = () => {
    useThemeStore.setState({
      themeMode: themeMode === 'light' ? 'dark' : 'light',
    });
  };
  return (
    <App className={styles.container}>
      <Outlet />
      <div className={styles.button} onClick={switchDarkMode}>
        <img
          src={
            themeMode === 'dark'
              ? 'https://gw.alipayobjects.com/zos/antfincdn/E19hyseWJI/9eedf301-ffd9-4863-a185-826891597f1c.png'
              : 'https://gw.alipayobjects.com/zos/antfincdn/le3%26GEsq5z/5fecc39a-18b2-486c-b387-be2700adcf30.png'
          }
          className={styles.img}
          alt={'切换模式'}
        />
      </div>
    </App>
  );
};

export default () => {
  const { themeMode } = useThemeStore();

  return (
    <ThemeProvider themeMode={themeMode}>
      <BaseLayout />
    </ThemeProvider>
  );
};
