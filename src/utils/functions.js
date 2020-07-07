const months = {
  0: {
    basic: 'Январь',
    inclined: 'Января',
  },
  1: {
    basic: 'Февраль',
    inclined: 'Февраля',
  },
  2: {
    basic: 'Март',
    inclined: 'Марта',
  },
  3: {
    basic: 'Апрель',
    inclined: 'Апреля',
  },
  4: {
    basic: 'Май',
    inclined: 'Мая',
  },
  5: {
    basic: 'Июнь',
    inclined: 'Июня',
  },
  6: {
    basic: 'Июль',
    inclined: 'Июля',
  },
  7: {
    basic: 'Август',
    inclined: 'Августа',
  },
  8: {
    basic: 'Сентябрь',
    inclined: 'Сентября',
  },
  9: {
    basic: 'Октябрь',
    inclined: 'Октября',
  },
  10: {
    basic: 'Ноябрь',
    inclined: 'Ноября',
  },
  11: {
    basic: 'Декабрь',
    inclined: 'Декабря',
  },
}

const weekdays = {
  0: { basic: 'Воскресенье', minimized: 'Вс' },
  1: { basic: 'Понедельник', minimized: 'Пн' },
  2: { basic: 'Вторник', minimized: 'Вт' },
  3: { basic: 'Среда', minimized: 'Ср' },
  4: { basic: 'Четверг', minimized: 'Чт' },
  5: { basic: 'Пятница', minimized: 'Пт' },
  6: { basic: 'Суббота', minimized: 'Сб' },
}

//Получение строки типа 'дд.мм.ГГГГ' из объекта Date
export const formatDateString = (dateString) => {
  // const testDate = new Date(Date.parse(dateString));
  const temp = new Date(dateString)
  const testDate = new Date(
    temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate(),
  )
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1) +
    '.' +
    testDate.getFullYear()
  )
}

export const formatDateStringNoYear = (dateString) => {
  // console.log(dateString);
  const temp = new Date(dateString)
  const testDate = new Date(
    temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate(),
  )
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1)
  )
}

export const formatDateStringWithTime = (dateString) => {
  const testDate = new Date(dateString)
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1) +
    '.' +
    testDate.getFullYear() +
    ' ' +
    (testDate.getHours() < 10
      ? '0' + testDate.getHours()
      : testDate.getHours()) +
    ':' +
    (testDate.getMinutes() < 10
      ? '0' + testDate.getMinutes()
      : testDate.getMinutes())
  )
}

export const formatDateStringToTime = (dateString) => {
  const testDate = new Date(dateString)
  return (
    (testDate.getHours() < 10
      ? '0' + testDate.getHours()
      : testDate.getHours()) +
    ':' +
    (testDate.getMinutes() < 10
      ? '0' + testDate.getMinutes()
      : testDate.getMinutes())
  )
}

export const formatDateStringNew = (dateString = new Date()) => {
  // console.log(dateString);
  const temp = new Date(dateString)
  return `${weekdays[temp.getDay()].basic}, ${temp.getDate()} ${months[
    temp.getMonth()
  ].inclined.toLowerCase()}`
}

export const formatDateStringDayOfTheWeek = (
  dateString = new Date(),
  isMinimized = false,
) => {
  const temp = new Date(dateString)
  return weekdays[temp.getDay()][isMinimized ? 'minimized' : 'basic']
}

export const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9
}
