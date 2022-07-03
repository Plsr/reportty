function paddedValue(value: number): string {
  return value < 10 ? `0${value}` : value.toString()
}

// eslint-disable-next-line import/prefer-default-export
export function secondsToMinutes(seconds: number): string {
  const sec = seconds % 60
  const min = (seconds - sec) / 60
  return `${paddedValue(min)}:${paddedValue(sec)}`
}
