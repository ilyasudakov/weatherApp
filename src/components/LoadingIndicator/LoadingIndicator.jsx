import React from 'react'
import './LoadingIndicator.scss'

const LoadingIndicator = (props) => {
  return (
    <div
      className={
        props.isLoading
          ? 'loading-indicator'
          : 'loading-indicator loading-indicator--hidden'
      }
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loading-indicator__message">
        {props.message || 'Идет загрузка...'}
      </div>
    </div>
  )
}

export default LoadingIndicator
