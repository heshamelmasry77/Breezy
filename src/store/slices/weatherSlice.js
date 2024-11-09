import { createSlice } from "@reduxjs/toolkit";

// OpenWeather API key
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const fetchCitySuggestions = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );
  return response.json();
};

export const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.json();
};

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
      } catch {
        dispatch(setError("Failed to fetch weather data for current location"));
        dispatch(setStatus("failed"));
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
    query: "", // Added query to the state
    selectedCity: null, // Added selectedCity to the state
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
      state.weatherDataHistory = action.payload;
    },
    resetWeatherData: (state) => {
      state.weatherDataHistory = {};
      state.city = "";
      state.temperature = null;
      state.status = "idle";
      state.citySuggestions = [];
      state.error = null;
      state.query = ""; // Reset query
      state.selectedCity = null; // Reset selectedCity
    },
    setQuery: (state, action) => {
      state.query = action.payload; // Added action to set query
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload; // Added action to set selectedCity
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
  resetWeatherData,
  setQuery,
  setSelectedCity,
} = weatherSlice.actions;

export default weatherSlice.reducer;
