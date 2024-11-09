import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const recentCities = useSelector((state) => state.recent.cities);
  const navigate = useNavigate();

  const handleSelectCity = (city) => {
    // Navigate to the home page with city data as query parameters
    navigate(`/?name=${city.name}&lat=${city.lat}&lon=${city.lon}`);
  };

  return (
    <div className="recent-searches p-6 bg-zinc-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Recent Searches</h2>
      <ul className="space-y-2">
        {recentCities.map((city, index) => (
          <li
            key={index}
            onClick={() => handleSelectCity(city)}
            className="cursor-pointer p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-between transition duration-200 ease-in-out"
          >
            <span className="font-medium text-lg">{city.name}</span>
            <span className="text-sm text-zinc-400">Click to view</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
