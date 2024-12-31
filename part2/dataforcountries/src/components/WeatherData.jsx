import { useState, useEffect } from "react";
import axios from "axios";

const WeatherData = ({ cityName }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const weatherDataRequest = axios.get(weatherDataUrl);
    weatherDataRequest.then(response => {
      setData(response.data);
    });
  }, [cityName]);

  if (data === null) {
    return <p>Loading weather data...</p>;
  }

  return (
    <>
      <p>Temperature: {data.main.temp} Celsius</p>
      <img alt={data.weather[0].description} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
      <p>Wind: {data.wind.speed} m/s</p>
    </>
  );
};

export default WeatherData;