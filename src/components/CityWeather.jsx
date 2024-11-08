import React from "react";
import { useSelector } from "react-redux";
import {
  SunIcon,
  CloudIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowsRightLeftIcon,
  EyeIcon,
  FaceSmileIcon,
  FireIcon,
} from "@heroicons/react/20/solid";

const CityWeather = () => {
  const weatherData = useSelector((state) => state.weather.weatherDataHistory);
  const hasWeatherData =
    weatherData && Object.keys(weatherData).length > 0 && weatherData.main;

  if (!hasWeatherData) {
    return (
      <div className="text-center text-gray-400">No weather data available</div>
    );
  }

  const { main, wind, clouds, weather, sys, name, visibility } = weatherData;

  // Determine the face icon for "Feels Like" based on temperature
  const getFeelsLikeIcon = (temp) => {
    if (temp >= 30) {
      return (
        <FaceSmileIcon
          className="h-6 w-6 text-yellow-500 mb-4"
          aria-label="Hot"
        />
      );
    } else if (temp >= 15) {
      return (
        <FaceSmileIcon
          className="h-6 w-6 text-blue-500 mb-4"
          aria-label="Warm"
        />
      );
    } else {
      return (
        <FaceSmileIcon
          className="h-6 w-6 text-cyan-400 mb-4"
          aria-label="Cold"
        />
      );
    }
  };

  return (
    <div className="p-8 text-white bg-zinc-900 rounded-lg shadow-lg space-y-8">
      {/* City and temperature */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{name || "City"}</h1>
        {main && (
          <div className="flex items-center justify-center mt-4">
            <span className="text-6xl font-bold">
              {Math.round(main.temp)}°C
            </span>
            <div className="ml-4 text-sm">
              <div>H: {Math.round(main.temp_max)}°</div>
              <div>L: {Math.round(main.temp_min)}°</div>
            </div>
          </div>
        )}
      </div>

      {/* Weather description */}
      {weather && weather[0] && (
        <div className="text-center text-gray-400 capitalize">
          <p>{weather[0].description}</p>
        </div>
      )}

      {/* Weather details */}
      <div className="grid grid-cols-2 gap-8 text-sm">
        {/* Feels Like */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          {getFeelsLikeIcon(main.feels_like)}
          <p>FEELS LIKE</p>
          <p className="text-xl font-semibold">
            {Math.round(main.feels_like)}°C
          </p>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <CloudIcon className="h-6 w-6 text-green-400 mb-4" />
          <p>HUMIDITY</p>
          <p className="text-xl font-semibold">{main.humidity}%</p>
        </div>

        {/* Pressure */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <ArrowDownIcon className="h-6 w-6 text-blue-400 mb-4" />
          <p>PRESSURE</p>
          <p className="text-xl font-semibold">{main.pressure} hPa</p>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <ArrowsRightLeftIcon className="h-6 w-6 text-yellow-500 mb-4" />
          <p>WIND SPEED</p>
          <p className="text-xl font-semibold">{wind.speed} m/s</p>
        </div>

        {/* Cloudiness */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <CloudIcon className="h-6 w-6 text-gray-400 mb-4" />
          <p>CLOUDINESS</p>
          <p className="text-xl font-semibold">{clouds.all}%</p>
        </div>

        {/* Visibility */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <EyeIcon className="h-6 w-6 text-purple-500 mb-4" />
          <p>VISIBILITY</p>
          <p className="text-xl font-semibold">{visibility / 1000} km</p>
        </div>
      </div>

      {/* Sunrise and Sunset */}
      {sys && (
        <div className="flex justify-around mt-8 text-xs text-gray-400">
          <div className="flex flex-col items-center">
            <SunIcon
              className="h-5 w-5 text-yellow-500 mb-2"
              aria-hidden="true"
            />
            <p>Sunrise</p>
            <p className="font-semibold">
              {new Date(sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <SunIcon
              className="h-5 w-5 text-orange-600 mb-2"
              aria-hidden="true"
            />
            <p>Sunset</p>
            <p className="font-semibold">
              {new Date(sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
