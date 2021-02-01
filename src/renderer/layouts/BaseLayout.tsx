import type { FC } from 'react';
import { useDarkMode } from '@/hooks';

import styles from './BaseLayout.less';

const BaseLayout: FC = ({ children }) => {
  const darkModeService = useDarkMode();

  const { theme, switchDarkMode } = darkModeService;

  return (
    <>
      {children}
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
