import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/icon-logo.svg';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="TravelTrucks logo" className={styles.logo}/>
            </div>

            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/catalog"
                    end
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Catalog
                </NavLink>
            </nav>
        </header>
    );
}
