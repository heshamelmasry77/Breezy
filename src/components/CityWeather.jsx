import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation"; // Import Capacitor Geolocation plugin
import {
  SunIcon,
  CloudIcon,
  ArrowDownIcon,
  ArrowsRightLeftIcon,
  EyeIcon,
  FaceSmileIcon,
} from "@heroicons/react/20/solid";
import CustomButton from "./shared/CustomButton.jsx";
import {
  setError,
  setStatus,
  fetchWeatherDataForCurrentLocation,
} from "../store/slices/weatherSlice.js";
import { showLoader, hideLoader } from "../store/slices/loaderSlice";

const CityWeather = () => {
  const weatherData = useSelector((state) => state.weather.weatherDataHistory);
  const hasWeatherData =
    weatherData && Object.keys(weatherData).length > 0 && weatherData.main;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.weather.error);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleGetCurrentLocation = async () => {
    try {
      // Request location permissions using Capacitor
      const permission = await Geolocation.requestPermissions();

      if (permission.location !== "granted") {
        dispatch(
          setError(
            "Location access denied. Please enable location permissions to view weather data."
          )
        );
        return;
      }

      dispatch(setStatus("loading"));
      dispatch(showLoader());
      setIsFetchingLocation(true);

      // Get the user's current location
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Fetch weather data for the obtained coordinates
      await dispatch(fetchWeatherDataForCurrentLocation(latitude, longitude));
      navigate("/", { replace: true }); // Clear query parameters from the URL
    } catch (error) {
      console.error("Error fetching location:", error);
      dispatch(
        setError(
          "Unable to retrieve location. Please try again or enable location services."
        )
      );
      dispatch(setStatus("failed"));
    } finally {
      dispatch(hideLoader());
      setIsFetchingLocation(false);
    }
  };

  if (!hasWeatherData) {
    return (
      <div className={"flex flex-col gap-4"}>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <CustomButton
          onClick={handleGetCurrentLocation}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"></path>
            </svg>
          }
          text="Current Location"
          color={`bg-blue-600 self-center ${
            isFetchingLocation ? "opacity-50 cursor-not-allowed" : ""
          }`}
          hoverColor="hover:bg-zinc-500"
          textColor="text-white"
          disabled={isFetchingLocation}
        />
      </div>
    );
  }

  const { main, wind, clouds, weather, sys, name, visibility } = weatherData;

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
          <p className="text-xl font-semibold text-center">
            {Math.round(main.feels_like)}°C
          </p>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <CloudIcon className="h-6 w-6 text-green-400 mb-4" />
          <p>HUMIDITY</p>
          <p className="text-xl font-semibold text-center">{main.humidity}%</p>
        </div>

        {/* Pressure */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <ArrowDownIcon className="h-6 w-6 text-blue-400 mb-4" />
          <p>PRESSURE</p>
          <p className="text-xl font-semibold text-center">
            {main.pressure} hPa
          </p>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <ArrowsRightLeftIcon className="h-6 w-6 text-yellow-500 mb-4" />
          <p>WIND SPEED</p>
          <p className="text-xl font-semibold text-center">{wind.speed} m/s</p>
        </div>

        {/* Cloudiness */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <CloudIcon className="h-6 w-6 text-gray-400 mb-4" />
          <p>CLOUDINESS</p>
          <p className="text-xl font-semibold text-center">{clouds.all}%</p>
        </div>

        {/* Visibility */}
        <div className="flex flex-col items-center bg-zinc-800 p-8 rounded-lg">
          <EyeIcon className="h-6 w-6 text-purple-500 mb-4" />
          <p>VISIBILITY</p>
          <p className="text-xl font-semibold text-center">
            {visibility / 1000} km
          </p>
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
