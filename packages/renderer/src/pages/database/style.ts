import { createStyles, css } from 'antd-style';

export default createStyles(({ token }) => ({
  container: css`
    background: ${token.colorBgLayout};
  `,
  card: css`
    //@apply mt-4 w-80;
  `,
}));
