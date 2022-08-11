export const INTERVAL_STATES = {
  work: 'work',
  break: 'break',
  longBreak: 'longBreak',
}

export type IntervalType = 'work' | 'break' | 'longBreak'

export function intervalTypeToString(intervalType: IntervalType): string {
  let intervalString = ''

  if (intervalType === INTERVAL_STATES.work) intervalString = 'Work'
  if (intervalType === INTERVAL_STATES.break) intervalString = 'Break'
  if (intervalType === INTERVAL_STATES.longBreak) intervalString = 'Long Break'

  return intervalString
}
