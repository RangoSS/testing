// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mystyles/Weather.css'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [city, setCity] = useState("New York");
  const [newCity, setNewCity] = useState("");

  const apiKey = '64a93b8d927f430fab5110210242509'; // Replace with your weatherapi.com key

  // Function to get current weather by city
  const getCurrentWeather = async (cityName) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  // Function to get forecast weather
  const getForecastWeather = async (cityName) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=no`);
      const forecast = response.data.forecast.forecastday;

      // Extract hourly and daily data
      setHourlyForecast(forecast.map(day => day.hour));
      setDailyForecast(forecast.map(day => ({
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
        maxtemp: unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f,
        mintemp: unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f,
        condition: day.day.condition.text,
        icon: day.day.condition.icon
      })));
    } catch (error) {
      console.error("Error fetching forecast weather:", error);
    }
  };

  // Fetch current and forecast data for the default city on app load
  useEffect(() => {
    getCurrentWeather(city);
    getForecastWeather(city);
  }, [city, unit]);

  // Handle city filtering
  const handleCityFilter = () => {
    setCity(newCity);
    setNewCity("");
  };

  // Save the current weather data to savedData
  const saveWeatherData = () => {
    if (weatherData && !savedData.some((data) => data.location.name === weatherData.location.name)) {
      setSavedData([...savedData, weatherData]);
    }
  };

  // Delete saved weather card
  const deleteSavedData = (cityName) => {
    setSavedData(savedData.filter((data) => data.location.name !== cityName));
  };

  // Switch between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Weather App</h1>

      {/* City Search */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleCityFilter}>Get Weather</button>
      </div>

      {/* Toggle Unit */}
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={toggleUnit}>
          Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>

      {/* Current Weather */}
      {weatherData && (
        <div className="card mb-4">
          <div className="card-body">
            <h2>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
            <p><strong>Time:</strong> {weatherData.location.localtime}</p>
            <p><strong>Temperature:</strong> {unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f}°{unit}</p>
            <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
            <img src={weatherData.current.condition.icon} alt="weather icon" />
            <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
            <p><strong>Visibility:</strong> {weatherData.current.vis_km} km</p>
            <button className="btn btn-success" onClick={saveWeatherData}>Save Weather Data</button>
          </div>
        </div>
      )}

      {/* Hourly Forecast - Horizontal Flex */}
      <div className="d-flex overflow-auto mb-1 fs-6 hourly">
        {hourlyForecast[0] && hourlyForecast[0].map((hour, index) => (
          <div className="card mr-2" key={index} style={{minWidth:'120px'}} >
            <div className="card-body text-center">
              <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>{unit === 'C' ? hour.temp_c : hour.temp_f}°{unit}</p>
              <img className='weather_icons' src={hour.condition.icon} alt="weather icon" />
              <p>{hour.condition.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast */}
      <div className="card mb-4">
        <div className="card-body">
          <h3>7-Day Forecast</h3>
          <div className="row">
            {dailyForecast.map((day, index) => (
              <div className="col-md-3 col-sm-6 mb-3" key={index}>
                <div className="card">
                  <div className="card-body text-center">
                    <h4>{day.day}</h4>
                    <p>{day.maxtemp}°{unit} / {day.mintemp}°{unit}</p>
                    <img src={day.icon} alt="weather icon" />
                    <p>{day.condition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Weather Data */}
      {savedData.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h3>Saved Weather Data</h3>
            {savedData.map((data, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <h5>{data.location.name}</h5>
                  <p>Temperature: {unit === 'C' ? data.current.temp_c : data.current.temp_f}°{unit}</p>
                  <p>Condition: {data.current.condition.text}</p>
                  <button className="btn btn-danger" onClick={() => deleteSavedData(data.location.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
