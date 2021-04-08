import styles from './TileArea.module.css';

function TileArea(props) {
    return (
        <ul className={styles.tileAreaContainer}>
            {props.children}
        </ul>
    );
}

export default TileArea;