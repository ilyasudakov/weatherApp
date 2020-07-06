import React, { useState, useEffect } from 'react'
import './App.css'

import { getCurrentWeatherByCoordinates } from './utils/API/fetchWeatherData'
import MainPage from './components/MainPage/MainPage'

const WeatherContext = React.createContext()
export default WeatherContext

const App = () => {
  const [weatherData, setWeatherData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [geoPositionIsLoaded, setGeoPositionIsLoaded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [locationData, setLocationData] = useState({
    lat: 0,
    lon: 0,
    city: '',
  })

  useEffect(() => {
    const getForecast = () => {
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
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
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
            setGeoPositionIsLoaded(true)
            return setIsLoading(false)
          },
        )
      }
    }

    if (!geoPositionIsLoaded && !isLoaded) {
      getGeoLocation()
    }
    if (!isLoaded && geoPositionIsLoaded && !isLoading) {
      getForecast()
    }
  }, [weatherData, isLoading, geoPositionIsLoaded, isLoaded, locationData])

  return (
    <div className="app">
      <WeatherContext.Provider
        value={{
          weatherData: weatherData,
          isLoading: isLoading,
          isLoaded: isLoaded,
          locationData: locationData,
        }}
      >
        <MainPage />
      </WeatherContext.Provider>
    </div>
  )
}

export { App }
