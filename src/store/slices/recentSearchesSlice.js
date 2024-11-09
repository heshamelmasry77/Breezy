import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: JSON.parse(localStorage.getItem("recentCities")) || [],
};

const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      const filteredCities = state.cities.filter(
        (city) => city.name !== action.payload.name
      );
      // Store the city with its name, latitude, and longitude
      state.cities = [
        {
          name: action.payload.name,
          lat: action.payload.lat,
          lon: action.payload.lon,
        },
        ...filteredCities,
      ].slice(0, 5);

      localStorage.setItem("recentCities", JSON.stringify(state.cities));
    },
  },
});

export const { addRecentSearch } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
