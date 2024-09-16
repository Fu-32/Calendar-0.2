import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

type SelectedDate = Date | [Date, Date] | null;

function App() {
  const [date, setDate] = useState<SelectedDate>(null);

  const handleDateChange: CalendarProps['onChange'] = (
    value,
    event
  ) => {
    if (!value) {
      setDate(null);
    } else if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value)) {
      const [start, end] = value;

      if (start && end) {
        const startDate = start instanceof Date ? start : new Date(start);
        const endDate = end instanceof Date ? end : new Date(end);

        if (
          !isNaN(startDate.getTime()) &&
          !isNaN(endDate.getTime())
        ) {
          setDate([startDate, endDate]);
        } else {
          setDate(null);
        }
      } else {
        // Si start ou end est null, on met date à null
        setDate(null);
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setDate(dateValue);
      } else {
        setDate(null);
      }
    } else {
      setDate(null);
    }
  };

  return (
    <div className="App">
      <h1>Système de Réservation</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          selectRange={true}
        />
      </div>
      {date && !Array.isArray(date) && (
        <p>Date sélectionnée : <strong>{date.toLocaleDateString()}</strong></p>
      )}
      {date && Array.isArray(date) && date[0] && date[1] && (
        <p>
          Plage sélectionnée : du <strong>{date[0].toLocaleDateString()}</strong> au{' '}
          <strong>{date[1].toLocaleDateString()}</strong>
        </p>
      )}
      {date && Array.isArray(date) && date[0] && date[1] && (
        <p>
          Coût du séjour : <strong>{
            (() => {
              const days = Math.ceil((date[1].getTime() - date[0].getTime()) / (1000 * 60 * 60 * 24));
              const costPerDay = 100; // Prix par jour en euros
              return `${days * costPerDay} €`;
            })()
          }</strong> (100 € par jour)
        </p>
      )}
    </div>
  );
}


export default App;