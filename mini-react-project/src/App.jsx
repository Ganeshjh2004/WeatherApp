import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import "./App.css";

export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [bgColor, setBgColor] = useState(""); // No initial background

 const updateInfo = (info) => {
  setWeatherInfo(info);

  if (info.humidity > 80) {
    setBgColor("linear-gradient(120deg, #3a6073, #16222a)"); // Rainy background
  } else if (info.temp > 25) {
    setBgColor("linear-gradient(120deg, #f6d365, #fda085)"); // Sunny warm
  } else if (info.temp < 15) {
    setBgColor("linear-gradient(120deg, #89f7fe, #66a6ff)"); // Cold blue
  } else {
    setBgColor("linear-gradient(120deg, #c9d6ff, #e2e2e2)"); // Mild
  }
};


  return (
    <div 
      className="App" 
      style={{ 
        minHeight: "100vh", 
        background: bgColor, 
        transition: "background 1s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centers vertically
        alignItems: "center" // Centers horizontally
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        🌦 Weather App
      </h1>
      <SearchBox updateInfo={updateInfo} />
      {weatherInfo && (
        <div style={{ marginTop: "20px" }}>
          <InfoBox info={weatherInfo} />
        </div>
      )}
    </div>
  );
}
