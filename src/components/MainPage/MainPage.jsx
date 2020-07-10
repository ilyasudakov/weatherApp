import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './MainPage.scss'

import WeatherList from '../WeatherList/WeatherList'
import WeatherContext from '../../App'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import {
  formatDateStringToTime,
  formatDateStringNew,
} from '../../utils/functions'

import geoIcon from '../../assets/geo-position.svg'
// import arrowIcon from '../../assets/arrow-right.svg'
import arrowIcon from '../../assets/external-link.svg'
import DaySummaryPage from '../DaySummaryPage/DaySummaryPage'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const MainPage = (props) => {
  const [curDay, setCurDay] = useState(0)
  // const [menuIsHidden, setMenuIsHidden] = useState(false)

  // const handleItemClick = () => {}

  useEffect(() => {}, [curDay])

  return (
    <WeatherContext.Consumer>
      {(ctx) => (
        <div className="main-page">
          <BrowserRouter>
            <Route
              exact
              path="/"
              render={(props) => (
                <GeneralPanel
                  forecast={ctx.forecastDay}
                  curDay={curDay}
                  curWeather={ctx.weatherData}
                  isLoading={ctx.isLoading}
                  setCurDay={setCurDay}
                  {...ctx}
                />
              )}
            />
            <Route
              exact
              path="/summary"
              render={(props) => (
                <DaySummaryPage
                  forecast={ctx.forecastDay}
                  curDay={curDay}
                  curWeather={ctx.weatherData}
                  isLoading={ctx.isLoading}
                  // {...ctx}
                  loadingError={ctx.loadingError}
                  // {...props}
                />
              )}
            />
          </BrowserRouter>
        </div>
      )}
    </WeatherContext.Consumer>
  )
}

export default MainPage

const GeneralPanel = (props) => {
  return (
    <div
      className={`main-page__wrapper ${
        props.curDay === 0 &&
        props.weatherData?.weather !== undefined &&
        props.loadingError === ''
          ? `main-page__wrapper--${props.weatherData.weather[0].main.toLowerCase()}`
          : props.forecast.length > 0 &&
            !props.isLoading &&
            props.loadingError === ''
          ? `main-page__wrapper--${props.forecast[
              props.curDay
            ].weather[0].main.toLowerCase()}`
          : ''
      } ${
        props.isLoading || props.loadingError !== ''
          ? 'main-page__wrapper--hidden'
          : ''
      }`}
    >
      {props.loadingError !== '' ? (
        <ErrorMessage message={props.loadingError} />
      ) : (
        <>
          <LoadingIndicator
            isLoading={props.isLoading}
            message="Ожидание ответа от OpenWeather API..."
          />
          <div className="main-page__title">
            <div className="main-page__title-item main-page__title-item--date">
              {formatDateStringNew(
                new Date(
                  new Date().setDate(new Date().getDate() + props.curDay),
                ),
              )}
            </div>
            <div className="main-page__title-item main-page__title-item--time">
              {formatDateStringToTime(
                new Date(
                  new Date().setDate(new Date().getDate() + props.curDay),
                ),
              )}
            </div>
            <div className="main-page__title-item main-page__title-item--city">
              <img className="main-page__img" src={geoIcon} alt="" />
              <span>{props.locationData.city}</span>
            </div>
          </div>
          <img
            className="main-page__weather-icon"
            src={`http://openweathermap.org/img/wn/${
              props.forecast.length > 0
                ? props.curDay === 0
                  ? props.weatherData.weather &&
                    props.weatherData.weather[0].icon
                  : props.forecast[props.curDay].weather[0].icon
                : ''
            }@4x.png`}
            alt=""
          />
          <div className="main-page__weather-temperature main-page__weather-temperature--description">
            {props.forecast.length > 0
              ? props.curDay === 0
                ? props.weatherData.weather &&
                  props.weatherData.weather[0].description
                : props.forecast[
                    props.curDay
                  ].weather[0].description.toLowerCase()
              : ''}
          </div>
          <div className="main-page__weather-temperature">
            {`${Number.parseInt(
              props.forecast.length > 0
                ? props.curDay === 0
                  ? props.weatherData?.main?.temp
                  : props.forecast[props.curDay].temp.day
                : 0,
            )}°`}
          </div>
          <div className="main-page__weather-temperature main-page__weather-temperature--message">
            {`Ощущается как ${Number.parseInt(
              props.forecast.length > 0
                ? props.curDay === 0
                  ? props.weatherData?.main?.feels_like
                  : props.forecast[props.curDay].feels_like.day
                : 0,
            )}°`}
          </div>
          <WeatherList
            forecast={props.forecast}
            weatherData={props.weatherData}
            curDay={props.curDay}
            setCurDay={props.setCurDay}
            isLoading={props.isLoading}
            // handleItemClick={handleItemClick}
          />
          <Link
            to="/summary"
            className={`main-page__button ${
              props.curDay !== 0
                ? 'main-page__button main-page__button--hidden'
                : ''
            }`}
            title="Перейти на страницу сводки дня"
          >
            <span>Сводка дня</span>
            <img className="main-page__img" src={arrowIcon} alt="" />
          </Link>
        </>
      )}
    </div>
  )
}
