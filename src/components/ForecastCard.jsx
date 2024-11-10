import PropTypes from "prop-types";
import {
  SunIcon,
  CloudIcon,
  ArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const ForecastCard = ({ forecast }) => {
  const { dt, main, weather, wind } = forecast;
  const date = new Date(dt * 1000).toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white flex flex-col items-center min-w-64">
      {/* Date and Time */}
      <div className="text-lg font-semibold mb-2">{date}</div>

      {/* Weather Icon and Description */}
      <div className="flex items-center space-x-2">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          className="h-10 w-10"
        />
        <span className="capitalize text-gray-300">
          {weather[0].description}
        </span>
      </div>

      {/* Temperature Details */}
      <div className="flex items-center space-x-2 my-2">
        <SunIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
        <span className="text-2xl">{Math.round(main.temp)}°C</span>
      </div>
      <div className="text-sm text-gray-400">
        Feels like {Math.round(main.feels_like)}°C
      </div>

      {/* Additional Details */}
      <div className="flex flex-col mt-2 space-y-1">
        <div className="flex items-center space-x-2">
          <CloudIcon className="h-5 w-5 text-blue-400" />
          <span>{main.humidity}% Humidity</span>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 text-purple-400" />
          <span>{wind.speed} m/s Wind</span>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowDownIcon className="h-5 w-5 text-green-400" />
          <span>{main.pressure} hPa Pressure</span>
        </div>
      </div>
    </div>
  );
};

ForecastCard.propTypes = {
  forecast: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ForecastCard;
