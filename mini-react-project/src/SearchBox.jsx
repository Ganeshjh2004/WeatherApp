import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

//   const API_KEY = 'dff69c0cfd1dbb8cf264f5ac788a45a8';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  let getWeatherData = async () => {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      let data = await response.json();
      return {
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].description
      };
    } catch (err) {
      throw err;
    }
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let newInfo = await getWeatherData();
      updateInfo(newInfo);
      setCity("");
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="search-form">
        <TextField 
          id="city" 
          label="City Name" 
          variant="outlined" 
          required  
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <br /><br />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" type="submit" className="search-button">
            Search
          </Button>
        </motion.div>
        {error && <p style={{ color: 'red' }}>No such place exists!</p>}
      </form>
    </motion.div>
  );
}
