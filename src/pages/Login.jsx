import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulación de login
    setTimeout(() => {
      if (formData.username && formData.password) {
        const isAdmin = formData.username.toLowerCase() === 'admin';
        login({
          id: Date.now(),
          name: formData.username,
          isAdmin
        });

        const from = location.state?.from || (isAdmin ? '/admin' : '/');
        navigate(from, { replace: true });
      } else {
        setError('Por favor completa todos los campos');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleClientLogin = () => {
    setFormData({ username: 'cliente', password: 'cliente' });
  };

  const handleAdminLogin = () => {
    setFormData({ username: 'admin', password: 'admin' });
  };

  return (
    <div className="login">
      <div className="login__split">
        {/* Lado izquierdo - Branding */}
        <div className="login__branding">
          <Link to="/" className="login__logo">
            Sazon Imperial
          </Link>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="login__form-container">
          <h1 className="login__title">Iniciar Sesión</h1>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleChange}
                className="login__input"
                autoComplete="username"
              />
            </div>

            <div className="login__field">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="login__input"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login__error">{error}</p>}

            <div className="login__test-users">
              <button
                type="button"
                className="login__test-btn"
                onClick={handleClientLogin}
              >
                Cliente Demo
              </button>
              <button
                type="button"
                className="login__test-btn"
                onClick={handleAdminLogin}
              >
                Admin Demo
              </button>
            </div>

            <button
              type="submit"
              className="login__submit"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="login__register">
            ¿No tienes Cuenta?{' '}
            <Link to="/registro" className="login__register-link">
              Registrate
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
