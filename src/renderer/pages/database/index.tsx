import type { FC } from 'react';
import React from 'react';
import { Button, Card } from 'antd';
import { useDatabase } from '@/hooks';

import styles from './index.less';

const Home: FC = () => {
  const { user } = useDatabase();
  return (
    <div className={styles.container}>
      <Card title={'测试数据库'} className={styles.card}>
        <Button
          onClick={async () => {
            const data = await user.insert('test', 'aaa');
            console.log(data);
          }}
        >
          插入数据
        </Button>
      </Card>
    </div>
  );
};

export default Home;
