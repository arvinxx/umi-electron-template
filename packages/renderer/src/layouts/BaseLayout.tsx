import type { FC } from 'react';
import { useDarkMode } from '@/hooks';
import { Outlet } from '@umijs/max';

import useStyles from './style';

const BaseLayout: FC = () => {
  const darkModeService = useDarkMode();
  const { styles } = useStyles();

  const { theme, switchDarkMode } = darkModeService;

  return (
    <>
      <Outlet />
      <div className={styles.button} onClick={switchDarkMode}>
        <img
          src={
            theme === 'dark'
              ? 'https://gw.alipayobjects.com/zos/antfincdn/E19hyseWJI/9eedf301-ffd9-4863-a185-826891597f1c.png'
              : 'https://gw.alipayobjects.com/zos/antfincdn/le3%26GEsq5z/5fecc39a-18b2-486c-b387-be2700adcf30.png'
          }
          className={styles.img}
          alt={'切换模式'}
        />
      </div>
    </>
  );
};

export default BaseLayout;
