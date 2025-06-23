import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.token);

  // ✅ Ocultar navbar en la página de login (/)
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav style={styles.nav}>
      {isAuthenticated && (
        <>
          <button style={styles.button} onClick={() => navigate('/posts')}>
            Posts
          </button>
          <button style={styles.button} onClick={() => navigate('/profile')}>
            Perfil
          </button>
          <button style={styles.button} onClick={() => {
            logout();
            navigate('/');
          }}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
  },
  button: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
};

export default Navbar;
