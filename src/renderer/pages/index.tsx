import type { FC } from 'react';
import React from 'react';
import { Button, Space } from 'antd';
import { shell } from 'electron';

import styles from './index.less';

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <img
          src={
            'https://gw.alipayobjects.com/zos/antfincdn/l8pO6mF4Aa/PngItem_35122.png'
          }
          alt="welcome"
          className={styles.img}
        />
      </div>
      <h1>欢迎使用 Umi Electron Template !</h1>
      <div className={styles.content}>
        更多资料请浏览
        <span className={styles.link}>空谷的 Electron 笔记</span>
      </div>
      <Space>
        <a target={'_blank'} href="https://www.yuque.com/arvinxx-fe/electron">
          <Button>在 Electron 打开</Button>
        </a>

        <Button
          onClick={() => {
            shell
              .openExternal('https://www.yuque.com/arvinxx-fe/electron')
              .then();
          }}
          type={'primary'}
        >
          在浏览器中打开
        </Button>
      </Space>
    </div>
  );
};

export default Home;
