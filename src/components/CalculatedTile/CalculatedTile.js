import styles from './CalculatedTile.module.css';

function CalculatedTile(props) {
    let getlabelName = () => {
        // Convert camelCase to Title Case
        let temp = props.valueName;
        let result = temp.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
    let labelName = getlabelName();
    return (
        <>
            <li className={styles.singleTile}>
                <h4 tabIndex='0' className={styles.tileTitle}>{labelName}</h4>
                <output tabIndex='0' className={styles.tileValue}>{props.valueResult.toString()}</output>
            </li>
            <hr style={{ border: '1px solid var(--light-gray)' }} />
        </>
    );
}

export default CalculatedTile;