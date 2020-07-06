import { request } from './fetchTemplate'

export const getCurrentWeather = (locationData = { city: 'Moscow' }) => {
  return request({
    url: `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
    method: 'GET',
  })
}
