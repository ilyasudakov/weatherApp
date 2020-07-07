import React, { useState, useEffect } from 'react'
import './App.css'

import {
  getCurrentWeatherByCoordinates,
  getForecastByCoordinates,
} from './utils/API/fetchWeatherData'
import MainPage from './components/MainPage/MainPage'

const WeatherContext = React.createContext()
export default WeatherContext

const App = () => {
  const [weatherData, setWeatherData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [geoPositionIsLoaded, setGeoPositionIsLoaded] = useState(false)
  const [forecast, setForecast] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [forecastIsLoaded, setForecastIsLoaded] = useState(false)
  const [locationData, setLocationData] = useState({
    lat: 0,
    lon: 0,
    city: '',
  })

  useEffect(() => {
    const getCurrentWeather = () => {
      setIsLoading(true)
      getCurrentWeatherByCoordinates(locationData)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setIsLoaded(true)
          setWeatherData({ ...res })
          setLocationData({
            ...locationData,
            city: res.name,
          })
          // setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoaded(true)
          // setIsLoading(false)
        })
    }

    const getForecast = () => {
      setIsLoading(true)
      getForecastByCoordinates(locationData)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setIsLoaded(true)
          setIsLoading(false)
          setForecast([...res.daily])
          setForecastIsLoaded(true)
        })
        .catch((error) => {
          console.log(error)
          setForecastIsLoaded(true)
          setIsLoaded(true)
          setIsLoading(false)
        })
    }

    const getGeoLocation = async () => {
      setIsLoading(true)
      if ('geolocation' in navigator) {
        return navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log('Latitude is :', position.coords.latitude)
            console.log('Longitude is :', position.coords.longitude)
            setLocationData({
              ...locationData,
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
            setIsLoading(false)
            return setGeoPositionIsLoaded(true)
          },
          function (error) {
            console.log(error)
            setGeoPositionIsLoaded(true)
            return setIsLoading(false)
          },
        )
      }

      setGeoPositionIsLoaded(true)
      return setIsLoading(false)
    }

    if (!geoPositionIsLoaded && !isLoaded) {
      getGeoLocation()
    }
    if (!isLoaded && geoPositionIsLoaded && !isLoading) {
      getForecast()
      getCurrentWeather()
    }
  }, [
    weatherData,
    isLoading,
    geoPositionIsLoaded,
    isLoaded,
    locationData,
    forecastIsLoaded,
  ])

  return (
    <div className="app">
      <WeatherContext.Provider
        value={{
          weatherData: weatherData,
          isLoading: !forecastIsLoaded,
          isLoaded: isLoaded,
          forecast: forecast,
          locationData: locationData,
          // forecastIsLoaded: forecastIsLoaded
        }}
      >
        <MainPage />
      </WeatherContext.Provider>
    </div>
  )
}

export { App }
