import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../store/slices/weatherSlice";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// Sample list of cities
const cities = [
  {
    id: 1,
    name: "New York",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  { id: 2, name: "London" },
  { id: 3, name: "Tokyo" },
  { id: 4, name: "Helsinki" },
];

const CitySearch = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const [query, setQuery] = useState("");

  // Filter cities based on the query
  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        );

  console.log("Filtered Cities:", filteredCities);

  return (
    <Combobox
      as="div"
      value={city}
      onChange={(selectedCity) => {
        console.log("City Selected:", selectedCity); // Log the selected city
        setQuery(""); // Clear the input field after selection
        dispatch(setCity(selectedCity)); // Dispatch the selected city object to Redux
        console.log("City dispatched to Redux:", selectedCity); // Log the dispatched city
      }}
      className="w-full max-w-lg mx-auto"
    >
      <label className="block text-lg font-semibold text-gray-800 mb-2 bg-blue-100 p-2 rounded-md shadow-sm">
        Select a City
      </label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
          onChange={(event) => {
            const newQuery = event.target.value;
            console.log("Query Updated:", newQuery); // Log query updates
            setQuery(newQuery);
          }}
          displayValue={(selectedCity) =>
            selectedCity ? selectedCity.name : ""
          }
          placeholder="Search for a city..."
        />
        {/*<ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">*/}
        {/*  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
        {/*</ComboboxButton>*/}

        {filteredCities.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCities.map((city) => (
              <ComboboxOption
                key={city.id}
                value={city}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white cursor-pointer"
              >
                <div className="flex items-center">
                  {/*<img src={city.imageUrl} alt="" className="h-6 w-6 shrink-0 rounded-full" />*/}
                  <span className="ml-3 truncate group-data-[selected]:font-semibold">
                    {city.name}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-blue-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
};

export default CitySearch;
