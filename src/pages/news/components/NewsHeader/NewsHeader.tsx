import { Link } from 'react-router';

import styles from './NewsHeader.module.css';

import logo from '@/assets/images/choonsik-emoji.gif';

export default function NewsHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" aria-label="홈으로 이동">
        <img src={logo} alt="춘식 컴퍼니 로고" className={styles.logo} />
      </Link>
      <h1 className={styles.title}>춘식 뉴스</h1>
    </header>
  );
}
