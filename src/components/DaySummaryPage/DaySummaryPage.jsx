import React, { useEffect } from 'react'
import './DaySummaryPage.scss'

const DaySummaryPage = (props) => {
  useEffect(() => {
    console.log(props.forecast)
  }, [])

  return (
    <div className="day-summary-page">
      <div className="day-summary-page__wrapper">Сводка дня</div>
    </div>
  )
}

export default DaySummaryPage
