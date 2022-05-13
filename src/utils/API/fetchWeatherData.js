import { request } from "./fetchTemplate";

export const getCurrentWeatherByCity = (locationData = { city: "Moscow" }) => {
  return request({
    url: `https://cors.eu.org/api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
    method: "GET",
  });
};

export const getCurrentWeatherByCoordinates = (
  locationData = { lon: 0, lat: 0 }
) => {
  return request({
    url: `https://cors.eu.org/api.openweathermap.org/data/2.5/weather?lon=${locationData.lon}&lat=${locationData.lat}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
    method: "GET",
  });
};

export const getForecastByCoordinates = (locationData = { lon: 0, lat: 0 }) => {
  return request({
    url: `https://cors.eu.org/api.openweathermap.org/data/2.5/onecall?lon=${locationData.lon}&lat=${locationData.lat}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&exclude=current,minutely&units=metric&lang=ru`,
    method: "GET",
  });
};
