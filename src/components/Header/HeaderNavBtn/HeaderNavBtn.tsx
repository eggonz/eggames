import type { IconType } from 'react-icons';
import styles from './HeaderNavBtn.module.css';

interface HeaderNavBtnProps {
    icons: IconType[];  // List of Fa* icons
    onCLick: () => void;
    position: "left" | "right"; // Position of the button
}

export default function HeaderNavBtn({ icons, onCLick, position }: HeaderNavBtnProps) {
    return (
        <button className={styles.headerNavBtn + ' ' + styles[position]}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCLick();
            }}
        >
            {icons.map((Icon: IconType, index: number) => (
                <Icon key={index}/>
            ))}
        </button>
    );
}
