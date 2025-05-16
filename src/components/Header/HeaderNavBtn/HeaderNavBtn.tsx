import type { IconType } from 'react-icons';
import { useNavigate, type To } from 'react-router-dom';
import styles from './HeaderNavBtn.module.css';

interface HeaderNavBtnProps {
    icons: IconType[];  // List of Fa* icons
    navDst: To | number;  // string or -1
    position: "left" | "right"; // Position of the button
}

export default function HeaderNavBtn({ icons, navDst, position }: HeaderNavBtnProps) {
    const navigate = useNavigate();
    return (
        <button className={styles.headerNavBtn + ' ' + styles[position]}
                onClick={() => {
                    if (typeof navDst === "number") { navigate(navDst) } else { navigate(navDst) }
                }}
        >
            {icons.map((Icon: IconType, index: number) => (
                <Icon key={index}/>
            ))}
        </button>
    );
}
