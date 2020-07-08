import React from 'react'
import './ErrorMessage.scss'

import errorIcon from '../../assets/error.svg'

const ErrorMessage = (props) => {
  return (
    <div className="error-message">
      <img className="error-message__img" src={errorIcon} alt="" />
      <span className="error-message__message">
        {props.message || 'Ошибка'}
      </span>
    </div>
  )
}

export default ErrorMessage
