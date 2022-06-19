export function secondsToMinutes(seconds) {
  const sec = seconds % 60
  const min = (seconds - sec) / 60
  return `${_paddedValue(min)}:${_paddedValue(sec)}`
}

function _paddedValue(value) {
  return value < 10 ? `0${value}` : value
}
