import {useNavigate} from 'react-router-dom';
import styles from './Home.module.css';
import heroImage from '../../assets/images/hero.jpg';

export default function Home() {
    const navigate = useNavigate();

    return (
        <section
            className={styles.hero}
            style={{backgroundImage: `url(${heroImage})`}}
        >
            <div className={styles.overlay}>
                <h1 className={styles.title}>Campers of your dreams</h1>
                <p className={styles.subtitle}>
                    You can find everything you want in our catalog
                </p>
                <button
                    onClick={() => navigate('/catalog')}
                    className={styles.button}
                >
                    View Now
                </button>
            </div>
        </section>
    );
}
