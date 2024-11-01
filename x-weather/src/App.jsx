import React, { useState, useEffect } from "react";
import axios from "axios";

const CitySearch = ({ onCitySelect }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onCitySelect(searchInput);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border border-gray-300 rounded-md w-60 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

const WeatherInfoCard = ({ label, value }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center mb-4">
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    <p className="text-xl font-medium text-gray-900">{value}</p>
  </div>
);

const WeatherDetails = ({ selectedCity }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      setIsLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "64eaaddfc41a4374823150512243110",
            q: selectedCity,
          },
        })
        .then((response) => setWeatherInfo(response.data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("Failed to fetch weather data");
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedCity]);

  return (
    <div className="flex flex-col items-center">
      {isLoading && <p className="text-gray-500">Loading data...</p>}
      {!isLoading && weatherInfo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <WeatherInfoCard label="Temperature" value={`${weatherInfo.current.temp_c}°C`} />
          <WeatherInfoCard label="Humidity" value={`${weatherInfo.current.humidity}%`} />
          <WeatherInfoCard label="Condition" value={weatherInfo.current.condition.text} />
          <WeatherInfoCard label="Wind Speed" value={`${weatherInfo.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
};

function App() {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySearch = (city) => setSelectedCity(city);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <CitySearch onCitySelect={handleCitySearch} />
      <WeatherDetails selectedCity={selectedCity} />
    </div>
  );
}

export default App;
