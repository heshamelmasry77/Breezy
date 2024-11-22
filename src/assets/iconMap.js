import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const iconMap = {
  "01d": WiDaySunny, // Clear sky (day)
  "01n": WiNightClear, // Clear sky (night)
  "02d": WiDayCloudy, // Few clouds (day)
  "02n": WiNightAltCloudy, // Few clouds (night)
  "03d": WiCloudy, // Scattered clouds
  "03n": WiCloudy, // Scattered clouds
  "04d": WiCloudy, // Broken clouds
  "04n": WiCloudy, // Broken clouds
  "09d": WiShowers, // Shower rain
  "09n": WiShowers, // Shower rain
  "10d": WiRain, // Rain (day)
  "10n": WiRain, // Rain (night)
  "11d": WiThunderstorm, // Thunderstorm (day)
  "11n": WiThunderstorm, // Thunderstorm (night)
  "13d": WiSnow, // Snow (day)
  "13n": WiSnow, // Snow (night)
  "50d": WiFog, // Mist (day)
  "50n": WiFog, // Mist (night)
};

export default iconMap;
