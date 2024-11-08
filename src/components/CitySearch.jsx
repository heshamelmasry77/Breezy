import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { citySuggestions, query, selectedCity } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    dispatch(showLoader());
    const getCurrentLocation = () => {
      dispatch(setSelectedCity(null));
      dispatch(setQuery(""));
      dispatch(setCity(""));
      dispatch(setStatus("loading"));
      dispatch(fetchWeatherDataForCurrentLocation());
    };

    getCurrentLocation();
    dispatch(hideLoader());
  }, [dispatch]);

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
    dispatch(showLoader()); // Show loader when starting the request

    try {
      const weatherData = await fetchWeatherData(city.lat, city.lon);
      dispatch(addWeatherDataToHistory(weatherData));
      dispatch(setTemperature(weatherData.main.temp));
      dispatch(setStatus("succeeded"));
    } catch {
      dispatch(setError("Failed to fetch weather data"));
      dispatch(setStatus("failed"));
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      // Hide loader after the request completes
    }
  };

  const handleClear = () => {
    dispatch(setSelectedCity(null));
    dispatch(setQuery(""));
    dispatch(resetWeatherData());
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
          <ComboboxInput
            className={`w-full border-0 text-zinc-50 sm:text-sm placeholder-zinc-50 rounded-lg p-4 bg-zinc-700 focus:ring-0 ring-0 outline-none ${
              query ? "bg-zinc-900 shadow-lg" : ""
            } transition-all duration-300 ease-in-out`}
            onBlur={() => dispatch(setQuery(""))}
            onChange={handleInputChange}
            displayValue={(city) => (city ? city.name : "")}
            placeholder="🔎  Search for a city..."
          />

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

        {selectedCity && (
          <CustomButton
            onClick={handleClear}
            icon={<XMarkIcon className="text-white h-4" aria-hidden="true" />}
            text="Clear"
            color="bg-red-600"
            hoverColor="hover:bg-zinc-500"
            textColor="text-white"
          />
        )}
      </div>
    </Combobox>
  );
};

export default CitySearch;
