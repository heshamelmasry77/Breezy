import { createSlice } from "@reduxjs/toolkit";

// Replace your actual OpenWeather API key
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

// Asynchronous function to fetch city suggestions
export const fetchCitySuggestions = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );
  const data = await response.json();
  return data; // Returns array of city suggestions
};

// Asynchronous function to fetch weather data
export const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data; // Returns weather data for the selected city
};

// Async function to fetch weather for the current location
export const fetchWeatherDataForCurrentLocation = () => async (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      dispatch(setStatus("loading"));
      try {
        const weatherData = await fetchWeatherData(latitude, longitude);
        dispatch(setTemperature(weatherData.main.temp));
        dispatch(addWeatherDataToHistory(weatherData));
        dispatch(setStatus("succeeded"));
      } catch (err) {
        dispatch(setError("Failed to fetch weather data for current location"));
        dispatch(setStatus(err));
      }
    });
  } else {
    dispatch(setError("Geolocation is not supported by this browser."));
    dispatch(setStatus("failed"));
  }
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    temperature: null,
    status: "idle",
    citySuggestions: [],
    weatherDataHistory: {},
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCitySuggestions: (state, action) => {
      state.citySuggestions = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addWeatherDataToHistory: (state, action) => {
      state.weatherDataHistory = action.payload; // Add an entire weather data object to history
    },
  },
});

export const {
  setCity,
  setTemperature,
  setStatus,
  setCitySuggestions,
  setError,
  addWeatherDataToHistory,
} = weatherSlice.actions;
export default weatherSlice.reducer;
