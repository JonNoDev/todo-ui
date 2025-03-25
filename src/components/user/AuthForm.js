import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const isRegister = type === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(payload));

    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/auth/${type}`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Email
          <input name="email" type="text" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>

        {isRegister ? (
          <Link to="/login" className={styles.altLink}>Already got an account?</Link>
        ) : (
          <Link to="/register" className={styles.altLink}>Create an account</Link>
        )}

        <button type="submit" className={styles.submitBtn}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
