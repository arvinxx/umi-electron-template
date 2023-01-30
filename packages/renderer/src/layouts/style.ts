import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  button: css`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: ${token.colorBgElevated};
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  `,
  img: css`
    width: 20px;
    height: 20px;
  `,
  container: css`
    height: 100vh;
    background: ${token.colorBgLayout};
  `,
}));
