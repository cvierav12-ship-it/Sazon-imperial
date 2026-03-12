import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import './AdminLayout.css';

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-layout__main">
        <header className="admin-layout__header">
          <div className="admin-layout__welcome">
            <h2>Bienvenido, Admin!</h2>
          </div>
          <div className="admin-layout__profile">
            <span className="admin-layout__avatar">
              {user.name?.substring(0, 2).toUpperCase() || 'AD'}
            </span>
            <span className="admin-layout__name">{user.name || 'Andres Gonzales'}</span>
          </div>
        </header>
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
