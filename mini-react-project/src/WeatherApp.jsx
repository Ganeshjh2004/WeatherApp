import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function WeatherApp(){
  
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    feelsLike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
  });
  let updateInfo = (newinfo) =>{
    setWeatherData(newinfo);
  }
    return(
        <div>
            <h3>Weather app</h3>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherData}/>
        </div>
    )
}