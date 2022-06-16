import { INTERVAL_STATES } from '../util/intervalTypes'
import { useEffect } from 'react'

export default function useNotification(onNotificationClick) {
  useEffect(() => {
    // TODO: Remove eventlistener when no longer needed
    document.addEventListener('notificationclick', onNotificationClick)
  }, [])

  function notifyUser({ title, body, actions }) {
    window.electronApi.sendNotification({ title, body, actions })
  }


  function notificationContent(intervalType, nextIntervalDuration) {
    switch(intervalType) {
      case INTERVAL_STATES.work:
        return { title: 'Work interval done!', body: `Well done. Time for a ${nextIntervalDuration} Minute break` }
      case INTERVAL_STATES.break:
        return { title: 'Break is over', body: `Back to work for a ${nextIntervalDuration} Minute interval` }
      default:
        throw new Error("Invalid interval Type")
    }
  }

  function intervalOverNotification({ intervalType, nextIntervalDuration, actions }) {
    const content = notificationContent(intervalType, nextIntervalDuration)
    const _actions = [{
      action: 'test',
      title: 'Click here'
    }]
    notifyUser({ title: content.title, body: content.body, actions: _actions })
  }

  return [intervalOverNotification]
}
