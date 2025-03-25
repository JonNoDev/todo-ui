import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src="/logo.png" alt="Logo" className={styles.logo} />
            </Link>

            <div className={styles.navLinks}>
                {isLoggedIn ? (
                    <>
                        <Link to="/" className={styles.link}>Home</Link>
                        <button
                            onClick={handleLogout}
                            className={`${styles.buttonReset} ${styles.link} ${styles.button}`}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className={styles.link}>Register</Link>
                        <Link to="/login" className={`${styles.link} ${styles.button}`}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;