import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconReservations = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="12" y2="18" />
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

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
        <h1 className="sidebar__logo-text">Sazon Imperial</h1>
      </div>

      <button
        className="sidebar__toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expandir menu' : 'Colapsar menu'}
      >
        {isCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </button>

      <nav className="sidebar__nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon"><IconDashboard /></span>
          <span className="sidebar__text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/reservaciones"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon"><IconReservations /></span>
          <span className="sidebar__text">Reservaciones</span>
        </NavLink>

        <NavLink
          to="/admin/calendario"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'active' : ''}`
          }
        >
          <span className="sidebar__icon"><IconCalendar /></span>
          <span className="sidebar__text">Calendario</span>
        </NavLink>
      </nav>

      <button className="sidebar__logout" onClick={handleLogout}>
        <span className="sidebar__icon"><IconLogout /></span>
        <span className="sidebar__text">Log Out</span>
      </button>
    </aside>
  );
}
