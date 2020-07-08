import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './DaySummaryPage.scss'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
} from 'recharts'

import { formatDateStringNew } from '../../utils/functions'
import arrowIcon from '../../assets/arrow-back.svg'

const DaySummaryPage = (props) => {
  const [showGraph, setShowGraph] = useState(
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) >= 768,
  )

  useEffect(() => {
    if (props.isLoading) {
      props.history.push('/')
    }
    console.log(props.forecast, props.curWeather)
  }, [props.curWeather, props.forecast, props.history, props.isLoading])

  return (
    <div className="day-summary-page">
      <div
        className={`day-summary-page__wrapper ${
          props.curWeather?.weather !== undefined
            ? `day-summary-page__wrapper--${props.curWeather.weather[0].main.toLowerCase()}`
            : ''
        }`}
        style={{
          maxWidth: `calc(350px - var(--padding-left-right) + ${
            showGraph
              ? (window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth) >= 1024
                ? '500px'
                : '350px'
              : '0px'
          })`,
        }}
      >
        <div
          className={`day-summary-page__graph ${
            !showGraph ? 'day-summary-page__graph--hidden' : ''
          }`}
        >
          {/* ГРАФИК 123 */}
          <GraphPanel
            forecast={props.forecast.map((hour, index) => {
              return Object.assign({
                weatherCondition: hour.weather[0].main.toLowerCase(),
                temperature: hour.temp,
                label: `${new Date(
                  new Date().setHours(new Date().getHours() + index),
                ).getHours()}:00`,
              })
            })}
          />
        </div>
        <div className="day-summary-page__general">
          <Link to="/" title="Вернуться назад">
            <img
              className="day-summary-page__img day-summary-page__img--back"
              src={arrowIcon}
              alt=""
            />
          </Link>
          <div className="day-summary-page__title">
            {formatDateStringNew(
              new Date(
                new Date().setDate(new Date().getDate() + props.curDay),
              ) || new Date(),
            )}
          </div>
          <div className="day-summary-page__basic-info">
            <div className="day-summary-page__location-data">
              <div className="day-summary-page__city">
                {props.curWeather?.name}
              </div>
              <div className="day-summary-page__main-temperature">{`${Number.parseInt(
                props.curWeather?.main?.temp,
              )}°`}</div>
            </div>
            <img
              className="day-summary-page__img day-summary-page__img--main-weather"
              src={`http://openweathermap.org/img/wn/${
                props.curWeather?.weather !== undefined
                  ? props.curWeather.weather[0].icon
                  : ''
              }@4x.png`}
              alt=""
            />
          </div>
          <div className="day-summary-page__atmosphere-data">
            <div className="day-summary-page__atmosphere-item day-summary-page__atmosphere-item--humidity">
              <span>Влажность</span>
              <span>{`${props.curWeather?.main?.humidity}%`}</span>
            </div>
            <div className="day-summary-page__atmosphere-item day-summary-page__atmosphere-item--wind">
              <span>Ветер</span>
              <span>{`${props.curWeather?.wind?.speed} м/c`}</span>
            </div>
            <div className="day-summary-page__atmosphere-item day-summary-page__atmosphere-item--pressure">
              <span>Давление</span>
              <span>{`${props.curWeather?.main?.pressure} мм`}</span>
            </div>
          </div>
          {(window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) >= 768 && (
            <button
              className="day-summary-page__button"
              onClick={(event) => {
                event.preventDefault()
                setShowGraph(!showGraph)
              }}
            >
              <span>{`${showGraph ? 'Скрыть' : 'Открыть'} график`}</span>
              {/* <img className="day-summary-page__img" src={arrowIcon} alt="" /> */}
            </button>
          )}
          <div className="day-summary-page__block-name">
            Прогноз на 48 часов
          </div>
          <div className="day-summary-page__list">
            {props.forecast.map((day, index) => (
              <React.Fragment key={index}>
                {new Date(
                  new Date().setHours(new Date().getHours() + index),
                ).getHours() === 0 && (
                  <div className="day-summary-page__list-divider">
                    {formatDateStringNew(
                      new Date(
                        new Date().setHours(new Date().getHours() + index),
                      ),
                    )}
                  </div>
                )}
                <div className="day-summary-page__list-item">
                  <div className="day-summary-page__hour-interval">{`${new Date(
                    new Date().setHours(new Date().getHours() + index),
                  ).getHours()}:00 - ${new Date(
                    new Date().setHours(new Date().getHours() + index + 1),
                  ).getHours()}:00`}</div>
                  <div className="day-summary-page__mini-weather">
                    <img
                      className="day-summary-page__img day-summary-page__img--side-weather"
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt=""
                    />
                    <span>{`${Number.parseInt(day.temp)}°`}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(DaySummaryPage)

const GraphPanel = (props) => {
  const colors = {
    clear: '#ecc046',
    clouds: '#6dc4de',
    drizzle: '#4a7291',
    rain: '#4a7291',
    thunderstorm: '#4a7291',
    snow: '#999999',
  }

  const CustomBar = (props) => {
    let { weatherCondition, fill } = props

    fill = colors[weatherCondition]

    return <Rectangle {...props} fill={fill} />
  }

  useEffect(() => {}, [])

  return (
    <div className="graph-panel">
      <BarChart
        width={
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) >= 1024
            ? 450
            : 300
        }
        height={400}
        data={props.forecast}
        layout="vertical"
      >
        <YAxis type="category" dataKey="label" />
        <XAxis type="number" dataKey="temperature" />
        {/* <Tooltip /> */}
        <Bar shape={CustomBar} dataKey="temperature" fillOpacity="0.5" />
      </BarChart>
    </div>
  )
}
