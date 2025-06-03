import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className={styles.circular}></div>
            <p className={styles.uploadingText}>Loading...</p>
        </div>
    );
}
