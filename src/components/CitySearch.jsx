import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setTemperature,
  setCitySuggestions,
  setStatus,
  setError,
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
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
    // Check if city and city.name exist
    if (!city || !city.name) {
      console.warn("Selected city is invalid or does not have a name:", city);
      return; // Exit the function if there's no valid selected city
    }

    console.log("City Selected:", city); // Log the selected city object
    setSelectedCity(city); // Set the selected city object here
    setQuery(""); // Clear the input field after selection
    console.log("Setting city in Redux:", city.name); // Log before dispatching city to Redux
    dispatch(setCity(city.name));
    dispatch(setStatus("loading"));

    try {
      console.log(
        "Fetching weather data for:",
        city.name,
        "at lat:",
        city.lat,
        "lon:",
        city.lon
      ); // Log before fetching weather
      const weatherData = await fetchWeatherData(city.lat, city.lon);
      console.log("Fetched Weather Data:", weatherData); // Log the fetched weather data
      dispatch(setTemperature(weatherData.main.temp));
      dispatch(setStatus("succeeded"));
    } catch (err) {
      console.error("Error fetching weather data:", err); // Log error if fetching fails
      dispatch(setError("Failed to fetch weather data"));
      dispatch(setStatus("failed"));
    }
  };

  return (
    <Combobox
      as="div"
      value={selectedCity} // Set this to the selected city object
      onChange={handleCitySelect}
      className="w-full max-w-lg mx-auto"
    >
      <label className="block text-lg font-semibold text-gray-800 mb-2 bg-blue-100 p-2 rounded-md shadow-sm">
        Select a City
      </label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
          onChange={handleInputChange}
          displayValue={(city) => (city ? city.name : "")} // Adjusted to display city name if available
          placeholder="Search for a city..."
        />
        {/*<ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">*/}
        {/*  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
        {/*</ComboboxButton>*/}

        {citySuggestions.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {citySuggestions.map((suggestion) => (
              <ComboboxOption
                key={`${suggestion.lat}-${suggestion.lon}`}
                value={suggestion} // Pass the full city object here
                className="group relative select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="ml-3 truncate group-data-[selected]:font-semibold">
                    {suggestion.name} ({suggestion.country})
                  </span>
                </div>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-blue-600 group-data-[selected]:flex group-data-[focus]:text-white"></span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>

      {/*/!* Display temperature if available *!/*/}
      {/*{status === "succeeded" && temperature !== null && (*/}
      {/*  <div className="mt-4 text-lg font-medium text-gray-800">*/}
      {/*    Temperature: {temperature}°C*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*/!* Display loading or error message *!/*/}
      {/*{status === "loading" && <div className="mt-4 text-gray-500">Loading...</div>}*/}
      {/*{status === "failed" && <div className="mt-4 text-red-500">{error}</div>}*/}
    </Combobox>
  );
};

export default CitySearch;
