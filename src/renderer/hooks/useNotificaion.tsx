import { useEffect } from 'react'
import { secondsToMinutes } from 'renderer/util/timeCalculations'
import { INTERVAL_STATES } from '../util/intervalTypes'

export default function useNotification(_onNotificationClick: () => void) {
  useEffect(() => {
    // TODO: Find out if still needed and implement properly
    // TODO: Remove eventlistener when no longer needed
    // document.addEventListener('notificationclick', onNotificationClick)
  }, [])

  function notifyUser({
    title,
    body,
    actions,
  }: Electron.NotificationConstructorOptions) {
    window.electron.ipcRenderer.sendNotification({ title, body, actions })
  }

  function notificationContent(
    intervalType: string,
    nextIntervalDuration: number
  ) {
    const duration = secondsToMinutes(nextIntervalDuration)
    switch (intervalType) {
      case INTERVAL_STATES.work:
        return {
          title: 'Work interval done!',
          body: `Well done. Time for a ${duration} Minute break`,
        }
      case INTERVAL_STATES.break:
        return {
          title: 'Break is over',
          body: `Back to work for a ${duration} Minute interval`,
        }
      case INTERVAL_STATES.longBreak:
        return {
          title: 'Break is over',
          body: `Back to work for a ${duration} Minute interval`,
        }
      default:
        throw new Error('Invalid interval Type')
    }
  }

  function intervalOverNotification({
    intervalType,
    nextIntervalDuration,
    actions,
  }: IntervalOverNotificationPayload) {
    const content = notificationContent(intervalType, nextIntervalDuration)
    notifyUser({ title: content.title, body: content.body, actions })
  }

  return [intervalOverNotification]
}

interface IntervalOverNotificationPayload {
  intervalType: string
  nextIntervalDuration: number
  actions?: Electron.NotificationAction[]
}
