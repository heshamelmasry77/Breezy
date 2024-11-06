import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    temperature: null,
    status: "idle", // Nothing is happening yet (loading, success, error)
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
  },
});

export const { setCity, setTemperature, setStatus } = weatherSlice.actions;
export default weatherSlice.reducer;
