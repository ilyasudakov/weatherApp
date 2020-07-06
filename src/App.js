import React, { useState, useEffect } from 'react'
import './App.css'

import { getCurrentWeather } from './utils/API/fetchWeatherData'
import MainPage from './components/MainPage/MainPage'

const WeatherContext = React.createContext()
export default WeatherContext

const WEATHER_DATA = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 300,
      main: 'Drizzle',
      description: 'light intensity drizzle',
      icon: '09d',
    },
  ],
  base: 'stations',
  main: {
    temp: 280.32,
    pressure: 1012,
    humidity: 81,
    temp_min: 279.15,
    temp_max: 281.15,
  },
  visibility: 10000,
  wind: { speed: 4.1, deg: 80 },
  clouds: { all: 90 },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875,
  },
  id: 2643743,
  name: 'London',
  cod: 200,
}

const LOCATION_DATA = {
  city: 'Moscow',
  translation: 'Москва',
}

const App = () => {
  const [weatherData, setWeatherData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [locationData, setLocationData] = useState({})

  useEffect(() => {
    const getForecast = () => {
      !isLoaded &&
        getCurrentWeather(LOCATION_DATA)
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            setIsLoaded(true)
            setWeatherData({ ...res })
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setIsLoading(false)
          })
    }

    getForecast()
  }, [weatherData, isLoading, isLoaded])

  return (
    <div className="app">
      <WeatherContext.Provider
        value={{
          // weatherData: WEATHER_DATA,
          weatherData: weatherData,
          isLoading: isLoading,
          isLoaded: isLoaded,
          locationData: LOCATION_DATA,
        }}
      >
        <MainPage
          weatherData={weatherData}
          isLoadind={isLoading}
          isLoaded={isLoaded}
          locationData={LOCATION_DATA}
        />
      </WeatherContext.Provider>
    </div>
  )
}

export { App }
