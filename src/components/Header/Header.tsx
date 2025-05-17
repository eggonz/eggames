import type { JSX } from "react";
import type { IconType } from 'react-icons';
import styles from './Header.module.css';
import HeaderNavBtn from "./HeaderNavBtn";

interface BtnProps {
  icons: IconType[];
  onClick: () => void;
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
          onCLick={leftBtn.onClick}
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
          onCLick={rightBtn.onClick}
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