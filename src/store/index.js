import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import loaderReducer from "./slices/loaderSlice";
import recentSearchesReducer from "./slices/recentSearchesSlice.js";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    loader: loaderReducer,
    recent: recentSearchesReducer,
  },
});

export default store;
