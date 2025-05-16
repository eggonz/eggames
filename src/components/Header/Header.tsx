import type { IconType } from 'react-icons';
import type { To } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderNavBtn from "./HeaderNavBtn";
import type { JSX } from "react";

interface BtnProps {
  icons: IconType[];
  navDst: To | number;
}

interface HeaderProps {
  title?: string;
  leftBtn?: BtnProps;
  rightBtn?: BtnProps;
  rightDiv?: JSX.Element;
}

export default function Header({ title, leftBtn, rightBtn, rightDiv }: HeaderProps) {
  return (
    <header>
      {leftBtn && (
        <HeaderNavBtn
          icons={leftBtn.icons}
          navDst={leftBtn.navDst}
          position={'left'}
        />
      )}
      {title && (
        <div className={styles.headerTitle}>
          <h1>{title}</h1>
        </div>
      )}
      {rightBtn && (
        <HeaderNavBtn
          icons={rightBtn.icons}
          navDst={rightBtn.navDst}
          position={'right'}
        />
      )}
      {rightDiv && (
        <div className={styles.right}>
          {rightDiv}
        </div>
      )}
    </header>
  );
}