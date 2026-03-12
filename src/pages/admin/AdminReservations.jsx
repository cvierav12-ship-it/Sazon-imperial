import { useState } from 'react';
import { useReservations } from '../../context/ReservationContext';
import './AdminReservations.css';

export default function AdminReservations() {
  const { reservations, deleteReservation } = useReservations();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const filteredReservations = reservations
    .filter(r => {
      if (filter === 'today') {
        return r.date === new Date().toISOString().split('T')[0];
      }
      if (filter === 'upcoming') {
        return new Date(r.date) >= new Date();
      }
      return true;
    })
    .filter(r => {
      if (!searchTerm) return true;
      return r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             r.phone.includes(searchTerm);
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reservación?')) {
      deleteReservation(id);
    }
  };

  return (
    <div className="admin-reservations">
      <div className="admin-reservations__header">
        <h2>RESERVACIONES</h2>
        <div className="admin-reservations__controls">
          <input
            type="text"
            placeholder="Buscar cliente o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-reservations__search"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-reservations__filter"
          >
            <option value="all">Todas</option>
            <option value="today">Hoy</option>
            <option value="upcoming">Próximas</option>
          </select>
        </div>
      </div>

      <div className="admin-reservations__list">
        {filteredReservations.length === 0 ? (
          <div className="admin-reservations__empty">
            No hay reservaciones para mostrar
          </div>
        ) : (
          filteredReservations.map((reservation) => (
            <div key={reservation.id} className="admin-reservations__item">
              <div className="admin-reservations__info">
                <div className="admin-reservations__datetime">
                  <span className="admin-reservations__date">
                    {formatDate(reservation.date)}
                  </span>
                  <span className="admin-reservations__time">
                    {formatTime(reservation.time)}
                  </span>
                  <span className="admin-reservations__table">
                    Mesa {reservation.table}
                  </span>
                </div>
                <div className="admin-reservations__client">
                  <span className="admin-reservations__name">
                    {reservation.clientName}
                  </span>
                  <span className="admin-reservations__phone">
                    📞 {reservation.phone}
                  </span>
                  <span className="admin-reservations__persons">
                    👥 {reservation.persons} personas
                  </span>
                </div>
              </div>
              <div className="admin-reservations__actions">
                <span className={`admin-reservations__status admin-reservations__status--${reservation.status}`}>
                  {reservation.status === 'confirmed' ? 'Confirmada' : reservation.status}
                </span>
                <button
                  className="admin-reservations__delete"
                  onClick={() => handleDelete(reservation.id)}
                  aria-label="Eliminar reservación"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
