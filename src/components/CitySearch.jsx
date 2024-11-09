import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setCity,
  setTemperature,
  setCitySuggestions,
  setStatus,
  setError,
  fetchWeatherDataForCurrentLocation,
  addWeatherDataToHistory,
  setQuery,
  setSelectedCity,
} from "../store/slices/weatherSlice";
import {
  fetchCitySuggestions,
  fetchWeatherData,
  resetWeatherData,
} from "../store/slices/weatherSlice";
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import { addRecentSearch } from "../store/slices/recentSearchesSlice.js";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import CustomButton from "./shared/CustomButton";
import { MapPinIcon, SunIcon, XMarkIcon } from "@heroicons/react/20/solid";

const CitySearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { citySuggestions, query, selectedCity } = useSelector(
    (state) => state.weather
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityName = queryParams.get("name");
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");

  const inputRef = useRef(null); // Ref for the input field

  // First useEffect: Get user's current location on mount only if no query parameters
  useEffect(() => {
    if (!lat || !lon) {
      const getCurrentLocation = () => {
        dispatch(showLoader());
        dispatch(setSelectedCity(null));
        dispatch(setQuery(""));
        dispatch(setCity(""));
        dispatch(setStatus("loading"));
        dispatch(fetchWeatherDataForCurrentLocation());
        dispatch(hideLoader());
      };

      getCurrentLocation();
    }
  }, [dispatch, lat, lon]);

  // Second useEffect: Fetch weather data if query parameters (cityName, lat, lon) are present
  useEffect(() => {
    if (cityName && lat && lon) {
      const fetchWeatherDataForCity = async () => {
        dispatch(setCity(cityName));
        dispatch(setStatus("loading"));
        dispatch(showLoader());

        try {
          const weatherData = await fetchWeatherData(lat, lon);
          dispatch(addWeatherDataToHistory(weatherData));
          dispatch(setTemperature(weatherData.main.temp));
          dispatch(setStatus("succeeded"));
          dispatch(addRecentSearch({ name: cityName, lat, lon }));
        } catch {
          dispatch(setError("Failed to fetch weather data"));
          dispatch(setStatus("failed"));
        } finally {
          dispatch(hideLoader());
        }
      };

      fetchWeatherDataForCity().then(() => {});
    }
  }, [cityName, lat, lon, dispatch]);

  // Handle input change and fetch city suggestions
  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
    dispatch(setQuery(newQuery));
    if (newQuery) {
      dispatch(setStatus("loading"));
      try {
        const suggestions = await fetchCitySuggestions(newQuery);
        dispatch(setCitySuggestions(suggestions));
        dispatch(setStatus("succeeded"));
      } catch {
        dispatch(setError("Failed to fetch city suggestions"));
        dispatch(setStatus("failed"));
      }
    } else {
      dispatch(setCitySuggestions([]));
    }
  };

  const handleCitySelect = async (city) => {
    if (!city || !city.name) {
      console.warn("Selected city is invalid or does not have a name:", city);
      return;
    }

    dispatch(setSelectedCity(city));
    dispatch(setQuery(""));
    dispatch(setCity(city.name));
    dispatch(setStatus("loading"));
    dispatch(showLoader());

    // Close the keyboard by blurring the input
    if (inputRef.current) {
      inputRef.current.blur();
    }

    try {
      const weatherData = await fetchWeatherData(city.lat, city.lon);
      dispatch(addWeatherDataToHistory(weatherData));
      dispatch(setTemperature(weatherData.main.temp));
      dispatch(setStatus("succeeded"));

      // Add city with lat and lon to recent searches
      dispatch(
        addRecentSearch({ name: city.name, lat: city.lat, lon: city.lon })
      );

      // Set the new query parameters in the URL
      navigate(`/?name=${city.name}&lat=${city.lat}&lon=${city.lon}`, {
        replace: true,
      });
    } catch {
      dispatch(setError("Failed to fetch weather data"));
      dispatch(setStatus("failed"));
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
    }
  };

  const handleClear = () => {
    dispatch(setSelectedCity(null));
    dispatch(setQuery(""));
    dispatch(resetWeatherData());
    // Clear query parameters from the URL
    navigate("/", { replace: true });
  };

  return (
    <Combobox
      as="div"
      value={selectedCity}
      onChange={handleCitySelect}
      className="w-full flex"
    >
      <div className="flex-1 flex gap-4 md:items-center flex-col items-stretch md:flex-row">
        <div className="relative flex-1">
          <div
            className={`flex gap-4 flex-nowrap bg-zinc-700 rounded-lg items-center h-12 ${
              query ? "bg-zinc-900 shadow-lg" : ""
            } transition-all duration-300 ease-in-out`}
          >
            <ComboboxInput
              ref={inputRef} // Attach the ref to the input
              className={`flex-1 border-0 text-zinc-50 sm:text-sm placeholder-zinc-50 bg-zinc-700 focus:ring-0 ring-0 outline-none rounded-lg p-4 h-full ${
                query ? "bg-zinc-900 shadow-lg" : ""
              } transition-all duration-300 ease-in-out`}
              onBlur={() => dispatch(setQuery(""))}
              onChange={handleInputChange}
              displayValue={(city) => (city ? city.name : "")}
              placeholder="🔎  Search for a city..."
            />
            {selectedCity && (
              <button
                onClick={handleClear}
                className={
                  "bg-red-500 hover:bg-red-600 rounded-full w-5 h-5 mr-4 flex items-center justify-center"
                }
              >
                <XMarkIcon className="text-white h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {citySuggestions.length > 0 && (
            <ComboboxOptions className="absolute z-10 max-h-60 w-full overflow-auto rounded-lg bg-zinc-700 shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm mt-2">
              {citySuggestions.map((suggestion) => (
                <ComboboxOption
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  value={suggestion}
                  className="group relative flex items-center gap-3 select-none py-2 px-4 text-gray-800 hover:bg-zinc-600 focus:text-white transition-colors duration-100 ease-in-out cursor-pointer"
                >
                  <SunIcon
                    className="h-4 w-4 text-yellow-500 group-hover:text-yellow-400"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 font-medium text-zinc-50 group-hover:text-blue-100 group-data-[selected]:font-semibold">
                      {suggestion.name}
                      <MapPinIcon
                        className="h-4 w-4 text-zinc-50"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm text-zinc-50">
                      {suggestion.state ? `${suggestion.state}, ` : ""}
                      {suggestion.country}
                    </span>
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </div>
    </Combobox>
  );
};

export default CitySearch;
