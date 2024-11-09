import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: JSON.parse(localStorage.getItem("recentCities")) || [],
};

const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      const { name, lat, lon } = action.payload;

      // Check if the city name, latitude, or longitude are null or undefined
      if (!name || lat === undefined || lon === undefined) {
        console.warn("Invalid city data:", action.payload);
        return; // Exit early if the data is invalid
      }

      // Filter out any existing city with the same name
      const filteredCities = state.cities.filter((city) => city.name !== name);

      // Add the new city with name, latitude, and longitude to the top of the list
      state.cities = [{ name, lat, lon }, ...filteredCities].slice(0, 5);

      // Store the updated recent cities in localStorage
      localStorage.setItem("recentCities", JSON.stringify(state.cities));
    },
  },
});

export const { addRecentSearch } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
