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
  const [forecastWeek, setForecastWeek] = useState([])
  const [forecastDay, setForecastDay] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [forecastIsLoaded, setForecastIsLoaded] = useState(false)
  const [locationData, setLocationData] = useState({
    lat: 0,
    lon: 0,
    city: 'Земля',
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
          console.log(`Error in getCurrentWeather(): ${error}`)
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
          setForecastIsLoaded(true)
          setIsLoading(false)
          setForecastWeek([...res.daily])
          setForecastDay([...res.hourly])
          // setIsLoaded(true)
        })
        .catch((error) => {
          console.log(error)
          console.log(`Error in getForecast(): ${error}`)
          setForecastIsLoaded(true)
          // setIsLoaded(true)
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
    if (!isLoaded && !forecastIsLoaded && geoPositionIsLoaded && !isLoading) {
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
          isLoading: !forecastIsLoaded || !isLoaded,
          isLoaded: isLoaded,
          forecast: forecastWeek,
          forecastDay: forecastDay,
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
