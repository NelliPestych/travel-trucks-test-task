import styles from './LoadMoreButton.module.css';

export default function LoadMoreButton({ onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            Load more
        </button>
    );
}
