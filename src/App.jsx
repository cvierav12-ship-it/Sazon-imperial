import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReservationProvider } from './context/ReservationContext';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reservations from './pages/Reservations';

// Páginas de administración
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminReservations from './pages/admin/AdminReservations';
import AdminCalendar from './pages/admin/AdminCalendar';

// Estilos globales
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReservationProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/reservaciones" element={<Reservations />} />

            {/* Rutas de administración */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reservaciones" element={<AdminReservations />} />
              <Route path="calendario" element={<AdminCalendar />} />
            </Route>
          </Routes>
        </ReservationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
