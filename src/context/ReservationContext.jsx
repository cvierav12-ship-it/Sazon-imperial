import { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext(null);

// Datos iniciales de ejemplo (del diseño de Figma)
const initialReservations = [
  {
    id: 1,
    clientName: 'Mr. Ramirez',
    phone: '987654321',
    date: '2026-03-13',
    time: '19:30',
    table: 1,
    persons: 2,
    status: 'confirmed'
  },
  {
    id: 2,
    clientName: 'Mr. Sanchez',
    phone: '987654322',
    date: '2026-03-11',
    time: '20:00',
    table: 5,
    persons: 4,
    status: 'confirmed'
  },
  {
    id: 3,
    clientName: 'Familia Chen',
    phone: '987654323',
    date: '2026-03-12',
    time: '19:00',
    table: 9,
    persons: 6,
    status: 'confirmed'
  }
];

// Datos de mesas
const initialTables = [
  { id: 1, name: 'Mesa 1', capacity: 4, available: true },
  { id: 2, name: 'Mesa 2', capacity: 4, available: true },
  { id: 3, name: 'Mesa 3', capacity: 2, available: true },
  { id: 4, name: 'Mesa 4', capacity: 6, available: true },
  { id: 5, name: 'Mesa 5', capacity: 4, available: true },
  { id: 6, name: 'Mesa 6', capacity: 2, available: true },
  { id: 7, name: 'Mesa 7', capacity: 8, available: true },
  { id: 8, name: 'Mesa 8', capacity: 4, available: true },
  { id: 9, name: 'Mesa 9', capacity: 6, available: true }
];

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState(initialTables);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar reservaciones guardadas o usar las iniciales
    const savedReservations = localStorage.getItem('sazonReservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    } else {
      setReservations(initialReservations);
      localStorage.setItem('sazonReservations', JSON.stringify(initialReservations));
    }
    setIsLoading(false);
  }, []);

  const addReservation = (reservation) => {
    const newReservation = {
      ...reservation,
      id: Date.now(),
      status: 'confirmed'
    };
    const updated = [...reservations, newReservation];
    setReservations(updated);
    localStorage.setItem('sazonReservations', JSON.stringify(updated));
    return newReservation;
  };

  const updateReservation = (id, data) => {
    const updated = reservations.map(r =>
      r.id === id ? { ...r, ...data } : r
    );
    setReservations(updated);
    localStorage.setItem('sazonReservations', JSON.stringify(updated));
  };

  const deleteReservation = (id) => {
    const updated = reservations.filter(r => r.id !== id);
    setReservations(updated);
    localStorage.setItem('sazonReservations', JSON.stringify(updated));
  };

  const getReservationsByDate = (date) => {
    return reservations.filter(r => r.date === date);
  };

  const getAvailableTables = (date, time) => {
    const reservedTables = reservations
      .filter(r => r.date === date && r.time === time)
      .map(r => r.table);

    return tables.filter(t => !reservedTables.includes(t.id));
  };

  const getWeekReservations = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return reservations.filter(r => {
      const date = new Date(r.date);
      return date >= start && date < end;
    });
  };

  return (
    <ReservationContext.Provider value={{
      reservations,
      tables,
      isLoading,
      addReservation,
      updateReservation,
      deleteReservation,
      getReservationsByDate,
      getAvailableTables,
      getWeekReservations
    }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations debe usarse dentro de ReservationProvider');
  }
  return context;
}
