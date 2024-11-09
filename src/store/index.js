import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import loaderReducer from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    loader: loaderReducer,
  },
});

export default store;
