import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setTemperature,
  setCitySuggestions,
  setStatus,
  setError,
  fetchWeatherDataForCurrentLocation,
} from "../store/slices/weatherSlice";
import {
  fetchCitySuggestions,
  fetchWeatherData,
} from "../store/slices/weatherSlice";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

const CitySearch = () => {
  const dispatch = useDispatch();
  const { citySuggestions, city, temperature, status, error } = useSelector(
    (state) => state.weather
  );
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  // Handle input change and fetch city suggestions
  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
    console.log(newQuery);
    setQuery(newQuery);
    if (newQuery) {
      dispatch(setStatus("loading"));
      try {
        const suggestions = await fetchCitySuggestions(newQuery);
        dispatch(setCitySuggestions(suggestions));
        dispatch(setStatus("succeeded"));
      } catch (err) {
        dispatch(setError("Failed to fetch city suggestions"));
        dispatch(setStatus("failed"));
      }
    } else {
      dispatch(setCitySuggestions([]));
    }
  };

  // Handle city selection and fetch weather data
  const handleCitySelect = async (city) => {
    if (!city || !city.name) {
      console.warn("Selected city is invalid or does not have a name:", city);
      return;
    }

    console.log("City Selected:", city);
    setSelectedCity(city);
    setQuery("");
    dispatch(setCity(city.name));
    dispatch(setStatus("loading"));

    try {
      console.log("Fetching weather data for:", city.name);
      const weatherData = await fetchWeatherData(city.lat, city.lon);
      dispatch(setTemperature(weatherData.main.temp));
      dispatch(setStatus("succeeded"));
    } catch (err) {
      console.error("Error fetching weather data:", err);
      dispatch(setError("Failed to fetch weather data"));
      dispatch(setStatus("failed"));
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setSelectedCity(null);
    setQuery("");
    dispatch(setCity(""));
    dispatch(setStatus("loading"));
    dispatch(fetchWeatherDataForCurrentLocation()); // Fetch temperature for current location
  };

  return (
    <Combobox
      as="div"
      value={selectedCity}
      onChange={handleCitySelect}
      className="w-full max-w-96 mx-auto"
    >
      <div className="flex items-center gap-2 mt-4">
        <div className="relative max-w-96 w-full">
          <ComboboxInput
            className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            onChange={handleInputChange}
            displayValue={(city) => (city ? city.name : "")}
            placeholder="🔎 Search for a city..."
          />
          {citySuggestions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {citySuggestions.map((suggestion) => (
                <ComboboxOption
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  value={suggestion}
                  className="group relative select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="ml-3 truncate group-data-[selected]:font-semibold flex gap-2 items-center">
                      <span>⛅</span>
                      {suggestion.name} ({suggestion.country})
                    </span>
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
        {selectedCity && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full bg-blue-600 px-2.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center gap-1 justify-center shrink-0"
          >
            <span>
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
            </span>
            <span>Current Location</span>
          </button>
        )}
      </div>
    </Combobox>
  );
};

export default CitySearch;
