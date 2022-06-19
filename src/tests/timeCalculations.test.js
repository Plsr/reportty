import { secondsToMinutes } from '../util/timeCalculations'

test('converts seconds to mm:ss', () => {
  expect(secondsToMinutes(620)).toBe('10:20')
})

test('adds a leading zero if minutes or seconds is < 10', () => {
  expect(secondsToMinutes(122)).toBe('02:02')
})

test('dispays 00:ss if minutes is 0', () => {
  expect(secondsToMinutes(10)).toBe('00:10')
})
