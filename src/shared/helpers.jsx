import moment from "moment"

// if time difference is less than 1 minute show just now
// otherwise show time in minutes/hours/days depending on time diff
export const getFormattedDate = date => {
  date = moment(date)
  const today = moment()
  let diff
  if ((diff = today.diff(date, "minutes")) < 60) {
    return diff ? `${diff} minutes ago` : "Just Now"
  } else if ((diff = today.diff(date, "hours")) < 25) {
    return `${diff} hours ago`
  } else if ((diff = today.diff(date, "days")) === 1) {
    return `Yesterday at ${date.format("h:mm a")}`
  } else {
    return date.format("lll")
  }
}

export const pick = (obj, keys) => {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {})
}
