import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const CitySelector = () => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then((response) => {
          setStateList(response.data);
          setState(""); 
          setCityList([]); 
          setCity(""); 
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        .then((response) => {
          setCityList(response.data);
          setCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [country, state]);

  const dropdownStyle = {
    margin: "10px",
    padding: "8px",
    fontSize: "16px",
  };

  const resultStyle = {
    marginTop: "20px",
    fontSize: "18px",
  };

  const highlightStyle = {
    fontWeight: "bold",
  };

  return (
    <div className="mx-auto w-screen">
      <h1 >Select Location</h1>
      <div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={dropdownStyle}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countryList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={!country}
          style={dropdownStyle}
        >
          <option value="" disabled>
            Select State
          </option>
          {stateList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}
          style={dropdownStyle}
        >
          <option value="" disabled>
            Select City
          </option>
          {cityList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {city && (
        <h2 style={resultStyle}>
          You selected <span style={highlightStyle}>{city}</span>, {state}, {country}
        </h2>
      )}
    </div>
  );
};

export default CitySelector;
