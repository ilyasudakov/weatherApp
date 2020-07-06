import React, { useContext } from 'react'
import './WeatherList.scss'

import WeatherContext from '../../App'

const WeatherList = (props) => {
  const weatherContext = useContext(WeatherContext)

  return <div className="weather-list"></div>
}

export default WeatherList
