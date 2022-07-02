export function secondsToMinutes(seconds: number): string {
  const sec = seconds % 60
  const min = (seconds - sec) / 60
  return `${_paddedValue(min)}:${_paddedValue(sec)}`
}

function _paddedValue(value: number): string {
  return value < 10 ? `0${value}` : value.toString()
}
