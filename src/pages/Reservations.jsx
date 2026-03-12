import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import TableSelector from '../components/TableSelector';
import './Reservations.css';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    persons: '2',
    date: '',
    time: ''
  });
  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [errors, setErrors] = useState({});

  const { user } = useAuth();
  const { tables, addReservation, getAvailableTables } = useReservations();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Requerido';
    if (!formData.phone.trim()) newErrors.phone = 'Requerido';
    if (!formData.date) newErrors.date = 'Requerido';
    if (!formData.time) newErrors.time = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectTable = () => {
    if (!validate()) return;
    setShowTableModal(true);
  };

  const handleTableSelected = (table) => {
    setSelectedTable(table);
    setShowTableModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || !selectedTable) return;

    const reservation = addReservation({
      clientName: formData.name,
      phone: formData.phone,
      persons: parseInt(formData.persons),
      date: formData.date,
      time: formData.time,
      table: selectedTable.id
    });

    setReservationDetails({
      ...reservation,
      tableName: selectedTable.name
    });
    setShowSuccessModal(true);
  };

  const handleNewReservation = () => {
    setShowSuccessModal(false);
    setFormData({
      name: user?.name || '',
      phone: '',
      persons: '2',
      date: '',
      time: ''
    });
    setSelectedTable(null);
    setReservationDetails(null);
  };

  const handleGoHome = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const availableTables = formData.date && formData.time
    ? getAvailableTables(formData.date, formData.time)
    : tables;

  return (
    <div className="reservations">
      <Header />

      <main className="reservations__main">
        <h1 className="reservations__title">Reservaciones</h1>

        <form className="reservations__form" onSubmit={handleSubmit}>
          <div className="reservations__grid">
            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">👤</span>
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`reservations__input ${errors.name ? 'error' : ''}`}
                placeholder="Eduardo Valles Ramirez"
              />
            </div>

            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">📞</span>
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`reservations__input ${errors.phone ? 'error' : ''}`}
                placeholder="987 362 534"
              />
            </div>

            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">📅</span>
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`reservations__input ${errors.date ? 'error' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">🕐</span>
                Hora
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`reservations__input ${errors.time ? 'error' : ''}`}
              >
                <option value="">Seleccionar hora</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
              </select>
            </div>

            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">👥</span>
                Personas
              </label>
              <select
                name="persons"
                value={formData.persons}
                onChange={handleChange}
                className="reservations__input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="reservations__field">
              <label className="reservations__label">
                <span className="reservations__icon">🪑</span>
                Mesa
              </label>
              <button
                type="button"
                className="reservations__table-btn"
                onClick={handleSelectTable}
              >
                {selectedTable ? selectedTable.name : 'Mesas Disponibles'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="reservations__submit"
            disabled={!selectedTable}
          >
            Reservar
          </button>
        </form>
      </main>

      <Footer />

      {/* Modal de selección de mesa */}
      <Modal
        isOpen={showTableModal}
        onClose={() => setShowTableModal(false)}
        size="large"
      >
        <TableSelector
          tables={availableTables}
          onSelect={handleTableSelected}
          onCancel={() => setShowTableModal(false)}
        />
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleGoHome}
        size="medium"
      >
        <div className="reservations__success">
          <div className="reservations__success-icon">✓</div>
          <h2 className="reservations__success-title">Reservación Confirmada</h2>
          <p className="reservations__success-subtitle">
            Te enviamos un email a tu inbox.
          </p>

          {reservationDetails && (
            <div className="reservations__details">
              <h3 className="reservations__details-title">Detalles de la Reservación</h3>
              <div className="reservations__details-list">
                <div className="reservations__details-item">
                  <span className="reservations__details-label">👤 Nombre</span>
                  <span className="reservations__details-value">{reservationDetails.clientName}</span>
                </div>
                <div className="reservations__details-item">
                  <span className="reservations__details-label">👥 Personas</span>
                  <span className="reservations__details-value">{reservationDetails.persons} personas</span>
                </div>
                <div className="reservations__details-item">
                  <span className="reservations__details-label">📅 Fecha</span>
                  <span className="reservations__details-value">{formatDate(reservationDetails.date)}</span>
                </div>
                <div className="reservations__details-item">
                  <span className="reservations__details-label">🕐 Hora</span>
                  <span className="reservations__details-value">{formatTime(reservationDetails.time)}</span>
                </div>
                <div className="reservations__details-item">
                  <span className="reservations__details-label">🪑 Mesa</span>
                  <span className="reservations__details-value">{reservationDetails.tableName}</span>
                </div>
              </div>
            </div>
          )}

          <div className="reservations__success-actions">
            <button className="reservations__success-btn" onClick={handleNewReservation}>
              🔄 Reservar una vez más
            </button>
            <button className="reservations__success-btn reservations__success-btn--secondary" onClick={handleGoHome}>
              🏠 Regresar al Inicio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
