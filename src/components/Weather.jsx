import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setTemperature } from "../store/slices/weatherSlice";
// import CitySearch from "./CitySearch.jsx";

const Weather = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const temperature = useSelector((state) => state.weather.temperature);

  const handleCityChange = (newCity) => {
    dispatch(setCity(newCity));
    // You can also fetch temperature and dispatch setTemperature
  };

  return (
    <div>
      {/*<h1>Weather for {city}</h1>*/}
      {/*<p>Temperature: {temperature}°C</p>*/}
      {/*<button onClick={() => handleCityChange("Helsinki")}>*/}
      {/*  Set City to Helsinki*/}
      {/*</button>*/}
    </div>
  );
};

export default Weather;
