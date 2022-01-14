export const fmtDate = (time) => {
  var unixTimestamp = new Date(time * 1000)
  return unixTimestamp.toLocaleString()
}
