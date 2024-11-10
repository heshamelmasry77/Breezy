import { useSelector } from "react-redux";
import ForecastCard from "./ForecastCard";

const ForecastList = () => {
  const forecastData = useSelector((state) => state.weather.forecastData);

  return (
    <div className="container mx-auto px-4 py-8 flex gap-6 overflow-x-auto">
      {forecastData?.list?.map((forecast, index) => (
        <ForecastCard key={index} forecast={forecast} />
      ))}
    </div>
  );
};

export default ForecastList;
