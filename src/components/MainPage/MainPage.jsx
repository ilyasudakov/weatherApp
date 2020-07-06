import React, { useContext, useEffect } from 'react'
import './MainPage.scss'
import WeatherList from '../WeatherList/WeatherList'

import WeatherContext from '../../App'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

import {
  formatDateStringNoYear,
  formatDateStringToTime,
} from '../../utils/functions'

const MainPage = (props) => {
  //   const weatherContext = useContext(WeatherContext)

  useEffect(() => {}, [])

  return (
    <WeatherContext.Consumer>
      {(ctx) => (
        <div className="main-page">
          <div
            className={`main-page__wrapper main-page__wrapper--${
              ctx.weatherData?.weather?.length > 0
                ? ctx.weatherData.weather[0].main.toLowerCase()
                : ''
            } ${ctx.isLoading ? 'main-page__wrapper--hidden' : ''}`}
          >
            <LoadingIndicator isLoading={ctx.isLoading} />
            <div className="main-page__title">
              <div className="main-page__title-item main-page__title-item--date">
                {formatDateStringNoYear(new Date())}
              </div>
              <div className="main-page__title-item main-page__title-item--time">
                {formatDateStringToTime(new Date())}
              </div>
              <div className="main-page__title-item main-page__title-item--city">
                {ctx.locationData.translation}
              </div>
            </div>
            <WeatherList />
          </div>
        </div>
      )}
    </WeatherContext.Consumer>
  )
}

export default MainPage
