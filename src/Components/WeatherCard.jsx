import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // Create a CSS file for additional styles

const Weather = () => {
    const [city, setCity] = useState('New York');
    const [unit, setUnit] = useState('Celsius');
    const [weatherData, setWeatherData] = useState(null);
    const [savedCities, setSavedCities] = useState([]);
    
    const API_KEY = 'YOUR_API_KEY'; // Replace with your weatherapi.com key

    const fetchWeather = async () => {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        setWeatherData(response.data);
    };

    const fetchForecast = async () => {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&hour=1`);
        return response.data;
    };

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const handleCityChange = (e) => setCity(e.target.value);

    const handleUnitChange = (e) => setUnit(e.target.value);

    const saveCity = () => {
        if (!savedCities.includes(city)) {
            setSavedCities([...savedCities, city]);
        }
    };

    const deleteCity = (cityToDelete) => {
        setSavedCities(savedCities.filter(c => c !== cityToDelete));
    };

    const renderWeatherDetails = () => {
        if (!weatherData) return null;

        const { current, location } = weatherData;
        const temp = unit === 'Celsius' ? current.temp_c : current.temp_f;
        
        return (
            <div className="weather-details">
                <div className="location-time">
                    <h2>{location.name}, {location.region}</h2>
                    <p>{new Date(location.localtime).toLocaleString()}</p>
                </div>
                <div className="temperature">
                    <h3>{temp}°{unit === 'Celsius' ? 'C' : 'F'}</h3>
                    <img src={current.condition.icon} alt={current.condition.text} />
                    <p>{current.condition.text}</p>
                </div>
            </div>
        );
    };

    const renderForecast = async () => {
        const forecastData = await fetchForecast();
        return (
            <div className="forecast">
                <h4>Hourly Forecast</h4>
                <div className="hourly-forecast">
                    {forecastData.forecast.forecastday[0].hour.map((hour, index) => (
                        <div key={index} className="hourly">
                            <p>{new Date(hour.time).getHours().toString().padStart(2, '0')}:00</p>
                            <img src={hour.condition.icon} alt={hour.condition.text} />
                            <p>{hour.temp_c}°C</p>
                        </div>
                    ))}
                </div>
                <h4>7-Day Forecast</h4>
                <div className="daily-forecast">
                    {forecastData.forecast.forecastday.map((day, index) => (
                        <div key={index} className="daily">
                            <h5>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h5>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                            <p>{day.day.avgtemp_c}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="weather-component">
            <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
            <select onChange={handleUnitChange}>
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
            </select>
            <button onClick={saveCity}>Save City</button>
            <div className="saved-cities">
                {savedCities.map((savedCity, index) => (
                    <div key={index}>
                        <span>{savedCity}</span>
                        <button onClick={() => deleteCity(savedCity)}>Delete</button>
                    </div>
                ))}
            </div>
            {renderWeatherDetails()}
            {renderForecast()}
        </div>
    );
};

export default Weather;
