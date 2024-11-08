import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setTemperature,
  setCitySuggestions,
  setStatus,
  setError,
  fetchWeatherDataForCurrentLocation,
  addWeatherDataToHistory,
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
import CustomButton from "./shared/CustomButton";
import { MapPinIcon, SunIcon, XMarkIcon } from "@heroicons/react/20/solid";

const CitySearch = () => {
  const dispatch = useDispatch();
  const { citySuggestions } = useSelector((state) => state.weather);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  // Handle input change and fetch city suggestions
  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
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

    setSelectedCity(city);
    setQuery("");
    dispatch(setCity(city.name));
    dispatch(setStatus("loading"));

    try {
      const weatherData = await fetchWeatherData(city.lat, city.lon);
      // Store the full weather data object in weatherDataHistory
      dispatch(addWeatherDataToHistory(weatherData));
      dispatch(setTemperature(weatherData.main.temp));
      dispatch(setStatus("succeeded"));
    } catch (err) {
      dispatch(setError("Failed to fetch weather data"));
      dispatch(setStatus("failed"));
    }
  };

  // Handle get current location
  const handleGetCurrentLocation = () => {
    setSelectedCity(null);
    setQuery("");
    dispatch(setCity(""));
    dispatch(setStatus("loading"));
    dispatch(fetchWeatherDataForCurrentLocation()); // Fetch temperature for current location
  };
  // Handle clear button click
  const handleClear = () => {
    setSelectedCity(null);
    setQuery("");
    dispatch(setCity(""));
    dispatch(setStatus("loading"));
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
            className={`w-full border-0 text-zinc-50 sm:text-sm placeholder-zinc-50 rounded-lg p-4 bg-zinc-700 focus:ring-0 ring-0 outline-none
      ${query ? "bg-zinc-900 shadow-lg" : ""}
      ${citySuggestions.length > 0 ? "" : ""}
      ${citySuggestions.length <= 0 && query ? "" : ""}
      transition-all duration-300 ease-in-out
    `}
            onBlur={() => setQuery("")}
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

        {/* Clear button */}
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
        {selectedCity && (
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
            color="bg-blue-600"
            hoverColor="hover:bg-zinc-500"
            textColor="text-white"
          />
        )}
      </div>
    </Combobox>
  );
};

export default CitySearch;
