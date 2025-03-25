import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src="/logo.png" alt="Logo" className={styles.logo} />
            </Link>
            <div className={styles.navLinks}>
                <Link to="/register" className={styles.link}>Register</Link>
                <Link to="/login" className={`${styles.link} ${styles.button}`}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;