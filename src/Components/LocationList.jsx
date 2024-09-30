import React from 'react';
import { ListGroup } from 'react-bootstrap';

function LocationList({ savedLocations, fetchWeatherBySearch }) {
  return (
    <div className="mt-4">
      <h3>Saved Locations</h3>
      <ListGroup>
        {savedLocations.map((location, index) => (
          <ListGroup.Item key={index} action onClick={() => fetchWeatherBySearch(location)}>
            {location}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default LocationList;
