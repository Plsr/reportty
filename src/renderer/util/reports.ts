import { FinishedTimer } from 'main/storeSchema'

export function getFinishedTimersByTaskName(
  finishedTimersArr: FinishedTimer[]
): FinishedTasksMetadata {
  if (finishedTimersArr.length < 1) return {}
  const finishedTasksMetadata: FinishedTasksMetadata = {}
  finishedTimersArr.forEach((timer) => {
    const currentTaskName = timer.taskName
    const presentData = finishedTasksMetadata[currentTaskName]

    finishedTasksMetadata[currentTaskName] = {
      totalTime: (presentData?.totalTime || 0) + timer.duration,
      timersCount: (presentData?.timersCount || 0) + 1,
    }
  })

  return finishedTasksMetadata
}

export interface FinishedTasksMetadata {
  [key: string]: {
    totalTime: number
    timersCount: number
  }
}
