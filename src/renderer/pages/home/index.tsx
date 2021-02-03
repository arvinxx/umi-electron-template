import type { FC } from 'react';
import React from 'react';
import { Button, Space } from 'antd';

import { routeTo } from '@/utils';
import { useShell } from '@/hooks';

import styles from './index.less';

const Home: FC = () => {
  const { openUrl } = useShell();

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
        <Button
          onClick={() => {
            openUrl('https://www.yuque.com/arvinxx-fe/electron');
          }}
        >
          打开笔记
        </Button>
        <Button
          onClick={() => {
            routeTo('/database');
          }}
          type={'primary'}
        >
          查看数据页面
        </Button>
      </Space>
    </div>
  );
};

export default Home;
