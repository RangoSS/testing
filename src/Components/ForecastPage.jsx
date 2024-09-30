import React, { useState } from 'react';

const ForecastPage = ({ forecast }) => {
  const [view, setView] = useState('daily'); // daily or hourly view

  return (
    <div className="mt-4">
      <h2>7-Day Forecast</h2>
      <button className="btn btn-secondary mb-3" onClick={() => setView(view === 'daily' ? 'hourly' : 'daily')}>
        View {view === 'daily' ? 'Hourly' : 'Daily'} Forecast
      </button>

      {forecast ? (
        <div className="row">
          {forecast.map((day, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div className="card p-3">
                <p><strong>Date:</strong> {day.date}</p>
                <p><strong>Max Temp:</strong> {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
                <p><strong>Min Temp:</strong> {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
                <p><strong>Condition:</strong> {day.day.condition.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default ForecastPage;
