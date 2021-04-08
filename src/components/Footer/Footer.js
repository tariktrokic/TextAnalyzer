import styles from './Footer.module.css';
import SvgFacebook from '../SvgComponents/SvgFacebook';
import SvgInstagram from '../SvgComponents/SvgInstagram';
import SvgGithub from '../SvgComponents/SvgGithub';
import SvgLinkedin from '../SvgComponents/SvgLinkedin';

function Footer(props) {
    const iconStyles = { width: '2em', fill: 'white' };
    return (
        <footer className={styles.footerContainer}>
            <p tabIndex="0" className={styles.footerText}>{props.text}</p>
            <div className={styles.iconContainer}>
                <a href="https://github.com/tariktrokic">
                    <SvgGithub {...iconStyles} />
                </a>
                <a href="https://www.linkedin.com/in/tariktrokic">
                    <SvgLinkedin {...iconStyles} />
                </a>
                <a href="https://www.facebook.com/tariktrokicc">
                    <SvgFacebook {...iconStyles} />
                </a>
                <a href="https://www.instagram.com/tarik_trokic">
                    <SvgInstagram {...iconStyles} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
