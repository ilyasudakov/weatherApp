import React, { useEffect } from 'react'
import './MainPage.scss'

import WeatherList from '../WeatherList/WeatherList'
import WeatherContext from '../../App'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import {
  formatDateStringToTime,
  formatDateStringNew,
  fahrenheitToCelsius,
} from '../../utils/functions'

import geoIcon from '../../assets/geo-position.svg'

const MainPage = (props) => {
  //   const weatherContext = useContext(WeatherContext)

  useEffect(() => {}, [])

  return (
    <WeatherContext.Consumer>
      {(ctx) => (
        <div className="main-page">
          <div
            className={`main-page__wrapper ${
              ctx.weatherData?.weather?.length > 0
                ? `main-page__wrapper--${ctx.weatherData.weather[0].main.toLowerCase()}`
                : ''
            } ${ctx.isLoading ? 'main-page__wrapper--hidden' : ''}`}
          >
            <LoadingIndicator isLoading={ctx.isLoading} />
            <div className="main-page__title">
              <div className="main-page__title-item main-page__title-item--date">
                {formatDateStringNew(new Date())}
              </div>
              <div className="main-page__title-item main-page__title-item--time">
                {formatDateStringToTime(new Date())}
              </div>
              <div className="main-page__title-item main-page__title-item--city">
                <img className="main-page__img" src={geoIcon} alt="" />
                <span>{ctx.locationData.city}</span>
              </div>
            </div>
            <img
              className="main-page__weather-icon"
              src={`http://openweathermap.org/img/wn/${
                ctx.weatherData?.weather?.length > 0
                  ? ctx.weatherData.weather[0].icon
                  : ''
              }@4x.png`}
              alt=""
            />
            <div className="main-page__weather-temperature">
              {`${Number.parseInt(ctx.weatherData?.main?.temp)}°`}
            </div>
            <div className="main-page__weather-temperature main-page__weather-temperature--message">
              {`Ощущается как ${Number.parseInt(
                ctx.weatherData?.main?.feels_like,
              )}°`}
            </div>
            <WeatherList />
          </div>
        </div>
      )}
    </WeatherContext.Consumer>
  )
}

export default MainPage
