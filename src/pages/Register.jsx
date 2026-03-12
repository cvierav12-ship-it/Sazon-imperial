import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username
      });
      setIsLoading(false);
      setShowSuccess(true);
    }, 500);
  };

  const handleContinue = () => {
    setShowSuccess(false);
    navigate('/');
  };

  return (
    <div className="register">
      <Header />

      <main className="register__main">
        <h1 className="register__title">Registrate</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__grid">
            <div className="register__field">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                className={`register__input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span className="register__error">{errors.name}</span>}
            </div>

            <div className="register__field">
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleChange}
                className={`register__input ${errors.username ? 'error' : ''}`}
              />
              {errors.username && <span className="register__error">{errors.username}</span>}
            </div>

            <div className="register__field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`register__input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="register__error">{errors.email}</span>}
            </div>

            <div className="register__field">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={`register__input ${errors.password ? 'error' : ''}`}
              />
              {errors.password && <span className="register__error">{errors.password}</span>}
            </div>

            <div className="register__field">
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                className={`register__input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <span className="register__error">{errors.phone}</span>}
            </div>

            <div className="register__field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`register__input ${errors.confirmPassword ? 'error' : ''}`}
              />
              {errors.confirmPassword && <span className="register__error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="register__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrate'}
          </button>
        </form>

        <p className="register__login">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="register__login-link">
            Inicia Sesión
          </Link>
        </p>
      </main>

      <Footer />

      {/* Modal de éxito */}
      <Modal isOpen={showSuccess} onClose={handleContinue} size="small">
        <div className="register__success">
          <div className="register__success-icon">✓</div>
          <h2 className="register__success-title">Registro Exitoso!</h2>
          <p className="register__success-text">
            El proceso se ha realizado correctamente
          </p>
          <button className="register__success-btn" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </Modal>
    </div>
  );
}
