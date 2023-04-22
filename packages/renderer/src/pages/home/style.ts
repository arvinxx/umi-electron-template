import { createStyles, css } from 'antd-style';

export default createStyles(({ token }) => ({
  container: css`
    background: ${token.colorBgLayout};

    padding: 48px;
  `,

  content: css`
    margin-bottom: 16px;
  `,

  link: css`
    color: ${token.colorPrimary};
  `,

  img: css`
    width: 500px;
  `,
}));
