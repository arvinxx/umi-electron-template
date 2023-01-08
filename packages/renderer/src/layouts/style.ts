import { createStyles, css } from 'antd-style';

export default createStyles({
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
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  `,
  img: css`
    width: 20px;
    height: 20px;
  `,
});
