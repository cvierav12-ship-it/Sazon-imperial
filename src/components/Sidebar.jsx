import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__logo">
        <h1 className="sidebar__logo-text">Sazón Imperial</h1>
      </div>

      <button
        className="sidebar__toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className="sidebar__nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon">📊</span>
          <span className="sidebar__text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/reservaciones"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon">📋</span>
          <span className="sidebar__text">Reservaciones</span>
        </NavLink>

        <NavLink
          to="/admin/calendario"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon">📅</span>
          <span className="sidebar__text">Calendario</span>
        </NavLink>
      </nav>

      <button className="sidebar__logout" onClick={handleLogout}>
        <span className="sidebar__icon">🚪</span>
        <span className="sidebar__text">Log Out</span>
      </button>
    </aside>
  );
}
