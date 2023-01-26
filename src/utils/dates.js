export const dateToTime = (date) => {
  const theDate = new Date(date).getTime()
  const toDays = Math.round((new Date() - theDate) / (1000 * 3600 * 24))

  const years = Math.floor(toDays / 365)
  const months = Math.floor(toDays / 30)
  const days = toDays % 30

  let timeStr = `${ days } days`

  if (years > 0) {
    timeStr = `${ years } years`
  } else if (months > 0) {
    timeStr = `${ months } months`
  }

  return `${ timeStr }`
}
