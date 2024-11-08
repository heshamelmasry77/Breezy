import CitySearch from "./CitySearch.jsx";
import CityWeather from "./CityWeather.jsx";

const Weather = () => {
  return (
    <div className={"flex flex-col gap-4"}>
      <CitySearch />
      <CityWeather />
    </div>
  );
};

export default Weather;
