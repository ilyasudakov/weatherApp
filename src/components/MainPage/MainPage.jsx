import React, { useEffect, useState } from 'react'
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
  const [curDay, setCurDay] = useState(0)
  const [menuIsHidden, setMenuIsHidden] = useState(false)

  const handleItemClick = () => {}

  useEffect(() => {}, [curDay])

  return (
    <WeatherContext.Consumer>
      {(ctx) => (
        <div className="main-page">
          <div
            className={`main-page__wrapper ${
              ctx.forecast.length > 0 && !ctx.isLoading
                ? `main-page__wrapper--${ctx.forecast[
                    curDay
                  ].weather[0].main.toLowerCase()}`
                : ''
            } ${ctx.isLoading ? 'main-page__wrapper--hidden' : ''}`}
          >
            <LoadingIndicator isLoading={ctx.isLoading} />
            <div className="main-page__title">
              <div className="main-page__title-item main-page__title-item--date">
                {formatDateStringNew(
                  new Date(new Date().setDate(new Date().getDate() + curDay)),
                )}
              </div>
              <div className="main-page__title-item main-page__title-item--time">
                {formatDateStringToTime(
                  new Date(new Date().setDate(new Date().getDate() + curDay)),
                )}
              </div>
              <div className="main-page__title-item main-page__title-item--city">
                <img className="main-page__img" src={geoIcon} alt="" />
                <span>{ctx.locationData.city}</span>
              </div>
            </div>
            <img
              className="main-page__weather-icon"
              src={`http://openweathermap.org/img/wn/${
                ctx.forecast.length > 0
                  ? curDay === 0
                    ? ctx.weatherData.weather && ctx.weatherData.weather[0].icon
                    : ctx.forecast[curDay].weather[0].icon
                  : ''
              }@4x.png`}
              alt=""
            />
            <div className="main-page__weather-temperature main-page__weather-temperature--description">
              {ctx.forecast.length > 0
                ? curDay === 0
                  ? ctx.weatherData.weather &&
                    ctx.weatherData.weather[0].description
                  : ctx.forecast[curDay].weather[0].description.toLowerCase()
                : ''}
            </div>
            <div className="main-page__weather-temperature">
              {`${Number.parseInt(
                ctx.forecast.length > 0
                  ? curDay === 0
                    ? ctx.weatherData?.main?.temp
                    : ctx.forecast[curDay].temp.day
                  : 0,
              )}°`}
            </div>
            <div className="main-page__weather-temperature main-page__weather-temperature--message">
              {`Ощущается как ${Number.parseInt(
                ctx.forecast.length > 0
                  ? curDay === 0
                    ? ctx.weatherData?.main?.feels_like
                    : ctx.forecast[curDay].feels_like.day
                  : 0,
              )}°`}
            </div>
            <WeatherList
              forecast={ctx.forecast}
              weatherData={ctx.weatherData}
              curDay={curDay}
              setCurDay={setCurDay}
              isLoading={ctx.isLoading}
              menuIsHidden={menuIsHidden}
              // handleItemClick={handleItemClick}
            />
          </div>
        </div>
      )}
    </WeatherContext.Consumer>
  )
}

export default MainPage
