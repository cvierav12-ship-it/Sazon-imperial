import { useState, useEffect } from 'react';
import { useReservations } from '../../context/ReservationContext';
import './AdminCalendar.css';

export default function AdminCalendar() {
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

  const prevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(today.setDate(diff)));
  };

  const getReservationForSlot = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return weekReservations.find(r => r.date === dateStr && r.time === time);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getMonthYear = () => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const firstDay = weekDates[0];
    const lastDay = weekDates[6];

    if (firstDay.getMonth() === lastDay.getMonth()) {
      return `${months[firstDay.getMonth()]} ${firstDay.getFullYear()}`;
    }
    return `${months[firstDay.getMonth()]} - ${months[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
  };

  return (
    <div className="admin-calendar">
      <div className="admin-calendar__header">
        <h2>CALENDARIO</h2>
        <div className="admin-calendar__nav">
          <button onClick={prevWeek} className="admin-calendar__nav-btn">
            ← Anterior
          </button>
          <button onClick={goToToday} className="admin-calendar__today-btn">
            Hoy
          </button>
          <span className="admin-calendar__month">{getMonthYear()}</span>
          <button onClick={nextWeek} className="admin-calendar__nav-btn">
            Siguiente →
          </button>
        </div>
      </div>

      <div className="admin-calendar__grid-wrapper">
        <div className="admin-calendar__grid">
          {/* Header de días */}
          <div className="admin-calendar__row admin-calendar__row--header">
            <div className="admin-calendar__cell admin-calendar__cell--time">
              HORA
            </div>
            {weekDates.map((date, i) => (
              <div
                key={i}
                className={`admin-calendar__cell admin-calendar__cell--day ${isToday(date) ? 'today' : ''}`}
              >
                <span className="admin-calendar__day-name">{days[i]}</span>
                <span className="admin-calendar__day-number">{date.getDate()}</span>
              </div>
            ))}
          </div>

          {/* Filas de tiempo */}
          {timeSlots.map((time) => (
            <div key={time} className="admin-calendar__row">
              <div className="admin-calendar__cell admin-calendar__cell--time">
                {formatTime(time)}
              </div>
              {weekDates.map((date, i) => {
                const reservation = getReservationForSlot(date, time);
                return (
                  <div
                    key={i}
                    className={`admin-calendar__cell ${reservation ? 'has-reservation' : ''} ${isToday(date) ? 'today-column' : ''}`}
                  >
                    {reservation && (
                      <div className="admin-calendar__reservation">
                        <div className="admin-calendar__reservation-header">
                          <span className="admin-calendar__reservation-time">
                            {formatTime(time)} - Mesa {reservation.table}
                          </span>
                        </div>
                        <span className="admin-calendar__reservation-client">
                          {reservation.clientName}
                        </span>
                        <span className="admin-calendar__reservation-persons">
                          {reservation.persons} personas
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
