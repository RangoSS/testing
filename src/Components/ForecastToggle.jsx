import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function ForecastToggle({ forecastType, setForecastType }) {
  return (
    <ButtonGroup className="d-flex justify-content-center mt-4">
      <ToggleButton
        type="radio"
        variant="outline-primary"
        name="radio"
        value="daily"
        checked={forecastType === 'daily'}
        onChange={(e) => setForecastType(e.target.value)}
      >
        Daily Forecast
      </ToggleButton>
      <ToggleButton
        type="radio"
        variant="outline-primary"
        name="radio"
        value="hourly"
        checked={forecastType === 'hourly'}
        onChange={(e) => setForecastType(e.target.value)}
      >
        Hourly Forecast
      </ToggleButton>
    </ButtonGroup>
  );
}

export default ForecastToggle;
