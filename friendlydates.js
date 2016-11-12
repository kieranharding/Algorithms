/* Convert a date range consisting of two dates formatted as YYYY-MM-DD into a
more readable format.

The friendly display should use month names instead of numbers and ordinal
dates instead of cardinal (1st instead of 1).

Do not display information that is redundant or that can be inferred by the
user: if the date range ends in less than a year from when it begins, do not
display the ending year.

Additionally, if the date range begins in the current year (i.e. it is
currently the year 2016) and ends within one year, the year should not be
displayed at the beginning of the friendly range.

If the range ends in the same month that it begins, do not display the ending
year or month. */

function makeFriendlyDates (arr) {
  function ordinalize (day) {
    // Assumes days is a 1 or 2 digit number in string form
    day = (day * 1) < 10 ? day.slice(-1) : day
    // Pre-teens are a bit of a special case
    // if (day.length > 1 && day.slice(0)) return day + 'th'
    if (day.slice(-2, -1) === '1') return day + 'th' // The slice returns blank if the string is only one character.
    switch (day.slice(-1)) {
      case '1':
        return day + 'st'
      case '2':
        return day + 'nd'
      case '3':
        return day + 'rd'
      default:
        return day + 'th'
    }
  }

  function getYear (date) {
    return date.slice(0, 4)
  }

  function getMonth (date) {
    return date.slice(5, 7)
  }

  function getDay (date) {
    return date.slice(-2)
  }

  function isBelowYear (arr) {
    if (getYear(arr[0]) === getYear(arr[1])) return true
    if (getYear(arr[1]) - getYear(arr[0]) > 1) return false

    // If we've made it this far, the years are 1 apart.
    if (getMonth(arr[1]) > getMonth(arr[0])) return false
    if (getMonth(arr[1]) < getMonth(arr[0])) return true

    // If we've made it this far, they are in the same month, one year apart
    if (getDay(arr[1]) < getDay(arr[0])) return true
    return false
  }

  function isThisYear (date) {
    return (getYear(date) + '' === '2016')
  }

  function isSameMonth (arr) {
    return (getYear(arr[0]) === getYear(arr[1]) && getMonth(arr[0]) === getMonth(arr[1]))
  }

  var monthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'Octobery',
    '11': 'November',
    '12': 'December'
  }

  var startDate = monthNames[getMonth(arr[0])] + ' '
  startDate += ordinalize(getDay(arr[0]))
  startDate += (isThisYear(arr[0]) && isBelowYear(arr))
    ? ''
    : ', ' + getYear(arr[0])

  var endDate = isSameMonth(arr) ? '' : monthNames[getMonth(arr[1])] + ' '
  endDate += ordinalize(getDay(arr[1]))
  endDate += isBelowYear(arr) ? '' : ', ' + getYear(arr[1])

  var result = arr[0] === arr[1] ? [startDate] : [startDate, endDate]

  return result
}

module.exports = makeFriendlyDates
