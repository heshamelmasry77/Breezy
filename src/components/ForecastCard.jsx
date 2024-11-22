import PropTypes from "prop-types";
import iconMap from "../assets/iconMap";

const ForecastCard = ({ forecast }) => {
  const { dt, main, weather, wind } = forecast;

  // Get formatted date
  const date = new Date(dt * 1000).toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Get the appropriate icon component
  const WeatherIcon = iconMap[weather[0].icon] || iconMap["03d"]; // Default to '03d' (Cloudy)

  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white flex flex-col items-center min-w-64">
      {/* Date and Time */}
      <div className="text-lg font-semibold mb-2">{date}</div>

      {/* Weather Icon and Description */}
      <div className="flex items-center space-x-2">
        <WeatherIcon size={32} color="#fff" />
        <span className="capitalize text-gray-300">
          {weather[0].description}
        </span>
      </div>

      {/* Temperature Details */}
      <div className="flex items-center space-x-2 my-2">
        <span className="text-2xl">{Math.round(main.temp)}°C</span>
      </div>
      <div className="text-sm text-gray-400">
        Feels like {Math.round(main.feels_like)}°C
      </div>

      {/* Additional Details */}
      <div className="flex flex-col mt-2 space-y-1">
        <div>
          <span>{main.humidity}% Humidity</span>
        </div>
        <div>
          <span>{wind.speed} m/s Wind</span>
        </div>
        <div>
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
