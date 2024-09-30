import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBar({ fetchWeatherBySearch, saveLocation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeatherBySearch(searchTerm);
      saveLocation(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex justify-content-center mt-4">
      <Form.Control
        type="text"
        placeholder="Search for a location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="me-2"
      />
      <Button type="submit" variant="primary">Search</Button>
    </Form>
  );
}

export default SearchBar;
