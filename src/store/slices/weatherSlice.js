import { createSlice } from "@reduxjs/toolkit";

// Replace with your actual OpenWeather API key
const API_KEY = "ba45116b5274858923e542a7fafa9bd3";

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

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    temperature: null,
    status: "idle",
    citySuggestions: [],
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
  },
});

export const {
  setCity,
  setTemperature,
  setStatus,
  setCitySuggestions,
  setError,
} = weatherSlice.actions;
export default weatherSlice.reducer;
