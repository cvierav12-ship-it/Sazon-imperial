import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <button
          className="header__menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <span className={`header__menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`header__link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            INICIO
          </Link>
          <Link
            to="/reservaciones"
            className={`header__link ${isActive('/reservaciones') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            RESERVACIONES
          </Link>
          {user ? (
            <div className="header__user">
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="header__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ADMIN
                </Link>
              )}
              <button className="header__profile" onClick={handleLogout}>
                <span className="header__avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`header__link ${isActive('/login') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              LOGIN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
