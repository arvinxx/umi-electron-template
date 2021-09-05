import type { FC } from 'react';
import { Button, Card } from 'antd';

import styles from './index.less';
import { dispatch } from '@/utils/dispatch';

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Card title={'测试数据库'} className={styles.card}>
        <Button
          onClick={async () => {
            const data = await dispatch('/user/add', 'test', 'aaa');
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
