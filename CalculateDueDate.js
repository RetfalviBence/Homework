const addDays = (date, days) => {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function CalculateDueData(submitDate, turnaroundTime) {

  // input type check
  if (!(submitDate instanceof Date)){
    throw Error("submitDate input must be Date!")
  }

  if (!Number.isInteger(turnaroundTime)){
    throw Error("turn-around input must be Integer!")
  }
  //

  if (turnaroundTime <= 0){
    throw Error("Not valid turn-around time")
  }
  
  const submitHour = submitDate.getHours()
  const submitDay = submitDate.getDay()

  if (submitHour < 9 || submitHour > 17) {
    throw Error("Report allowed in working hours (9AM to 5PM)")
  }

  if (submitDay == 0 || submitDay == 6) {
    throw Error("Report allowed in weekdays (Monday to Friday)")
  }


  const hoursFromStart = submitHour - 9

  // calculate the resolve hour
  const resolveHour = (turnaroundTime + hoursFromStart) % 8 + 9

  // calculate needed working days
  const pastDays = Math.floor((turnaroundTime + hoursFromStart) / 8)

  // calculate needed weekend days
  const pastWeekendDays = ((pastDays + submitDay - 1) / 5) * 2

  // calculate resolve date
  let resolveDate = addDays(submitDate, pastDays + pastWeekendDays)
  resolveDate.setHours(resolveHour)

  return resolveDate

}

module.exports = CalculateDueData