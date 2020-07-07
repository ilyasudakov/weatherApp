import React, { useContext } from 'react'
import './WeatherList.scss'

import WeatherContext from '../../App'
import { formatDateStringDayOfTheWeek } from '../../utils/functions'

const WeatherList = (props) => {
  const weatherContext = useContext(WeatherContext)

  return (
    <div
      className={`weather-list ${
        props.forecast[props.curDay]?.weather
          ? `weather-list--${props.forecast[
              props.curDay
            ].weather[0].main.toLowerCase()}`
          : ''
      } ${props.isLoading ? 'weather-list--hidden' : ''}`}
    >
      <div className="weather-list__wrapper">
        {props.forecast.map((day, index) => {
          return (
            <div
              className={`weather-list__item ${
                index === props.curDay ? 'weather-list__item--active' : ''
              }`}
              key={index}
              onClick={() => {
                props.setCurDay(index)
              }}
            >
              <div className="weather-list__day">
                {formatDateStringDayOfTheWeek(
                  new Date(new Date().setDate(new Date().getDate() + index)),
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) < 768,
                )}
              </div>
              <div className="weather-list__info">
                <img
                  className="weather-list__weather-icon"
                  src={`http://openweathermap.org/img/wn/${
                    index === 0
                      ? props.weatherData.weather &&
                        props.weatherData.weather[0].icon
                      : day.weather[0].icon
                  }.png`}
                  alt=""
                />
                <div className="weather-list__dates">
                  <div className="weather-list__temperature">{`${Number.parseInt(
                    index === 0 ? props.weatherData?.main?.temp : day.temp.day,
                  )}°`}</div>
                  <div className="weather-list__temperature weather-list__temperature--night">{`${Number.parseInt(
                    index === 0
                      ? props.weatherData?.main?.temp
                      : day.temp.night,
                  )}°`}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeatherList
