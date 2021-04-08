import styles from './Header.module.css';
import headerImage from '../../assets/header-image.jpg';

function Header(props) {
    return (
        <header className={styles.imageHeader} style={{ backgroundImage: `linear-gradient(to right, rgba(0, 129, 190, 0.7), rgba(0, 173, 254, 0.7)), url(${headerImage})` }}>
            <h1 tabIndex='0' className={styles.title}>
                {props.title}
            </h1>
            <h3 tabIndex='0' className={styles.subTitle}>
                {props.subTitle}
            </h3>
        </header>
    );
}

export default Header;