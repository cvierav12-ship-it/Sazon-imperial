import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReservations } from '../../context/ReservationContext';
import './Dashboard.css';

export default function Dashboard() {
  const { reservations, getWeekReservations } = useReservations();
  const [weekReservations, setWeekReservations] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  useEffect(() => {
    const weekRes = getWeekReservations(currentWeekStart.toISOString().split('T')[0]);
    setWeekReservations(weekRes);
  }, [currentWeekStart, reservations, getWeekReservations]);

  const totalReservations = reservations.length;
  const weeklyReservations = weekReservations.length;
  const occupancyRate = Math.round((weeklyReservations / 21) * 100); // Asumiendo 3 slots por día

  const days = ['lun', 'mar', 'mi', 'jue', 'vie', 'sab', 'dom'];
  const timeSlots = ['17:00', '18:00', '19:00', '19:30', '20:00', '21:00', '22:00'];

  const getWeekDates = () => {
    return days.map((_, i) => {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const getReservationForSlot = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return weekReservations.find(r => r.date === dateStr && r.time === time);
  };

  const formatTime = (time) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${ampm}`;
  };

  return (
    <div className="dashboard">
      {/* Métricas */}
      <div className="dashboard__metrics">
        <div className="dashboard__metric">
          <div className="dashboard__metric-info">
            <span className="dashboard__metric-label">Reservaciones</span>
            <span className="dashboard__metric-value">{totalReservations}</span>
          </div>
          <div className="dashboard__metric-icon">📋</div>
        </div>

        <div className="dashboard__metric">
          <div className="dashboard__metric-info">
            <span className="dashboard__metric-label">Esta Semana</span>
            <span className="dashboard__metric-value">{weeklyReservations} reservaciones</span>
            <span className="dashboard__metric-subtext">{occupancyRate}% ocupación</span>
          </div>
          <div className="dashboard__metric-icon">📅</div>
        </div>
      </div>

      {/* Calendario semanal */}
      <div className="dashboard__calendar">
        <div className="dashboard__calendar-header">
          <h3>CALENDARIO</h3>
          <Link to="/admin/calendario" className="dashboard__calendar-link">
            Ver completo →
          </Link>
        </div>

        <div className="dashboard__calendar-grid">
          {/* Header de días */}
          <div className="dashboard__calendar-row dashboard__calendar-row--header">
            <div className="dashboard__calendar-cell dashboard__calendar-cell--time">
              HORA
            </div>
            {weekDates.map((date, i) => (
              <div key={i} className="dashboard__calendar-cell dashboard__calendar-cell--day">
                <span className="dashboard__day-name">{days[i]}</span>
                <span className="dashboard__day-number">{date.getDate()}</span>
              </div>
            ))}
          </div>

          {/* Filas de tiempo */}
          {timeSlots.map((time) => (
            <div key={time} className="dashboard__calendar-row">
              <div className="dashboard__calendar-cell dashboard__calendar-cell--time">
                {formatTime(time)}
              </div>
              {weekDates.map((date, i) => {
                const reservation = getReservationForSlot(date, time);
                return (
                  <div
                    key={i}
                    className={`dashboard__calendar-cell ${reservation ? 'has-reservation' : ''}`}
                  >
                    {reservation && (
                      <div className="dashboard__reservation-card">
                        <span className="dashboard__reservation-time">
                          {time} - Mesa {reservation.table}
                        </span>
                        <span className="dashboard__reservation-client">
                          {reservation.clientName}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
