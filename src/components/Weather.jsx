import CitySearch from "./CitySearch.jsx";
import CityWeather from "./CityWeather.jsx";
import ForecastList from "./ForecastList.jsx";

const Weather = () => {
  return (
    <div className={"flex flex-col gap-4"}>
      <CitySearch />
      <CityWeather />
      <ForecastList />
    </div>
  );
};

export default Weather;
