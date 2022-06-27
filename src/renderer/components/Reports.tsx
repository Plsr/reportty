import { Text, Box, HStack } from '@chakra-ui/react'

export default function Reports({ finishedTimers }: ReportsProps) {

  const finishedTimersByTaskName = (): FinishedTasksMetadata => {
    if (finishedTimers.length < 1) return {}
    const finishedTasksMetadata: FinishedTasksMetadata = {}
    finishedTimers.forEach(timer => {
      const currentTaskName = timer.taskName
      const presentData = finishedTasksMetadata[currentTaskName]
      
      finishedTasksMetadata[currentTaskName] = {
        totalTime: (presentData?.totalTime || 0) + timer.duration,
        timersCount: (presentData?.timersCount || 0) + 1
      }
    })

    return finishedTasksMetadata
  }

  return (
    <>
      <Text mt="8">{ finishedTimers.length } Intervals finished today</Text>
      {
        Object.entries(finishedTimersByTaskName()).map(([taskName, data]) => (
          <Box mb="4">
            <HStack><Text>{taskName} — {data.timersCount} Timers ({data.totalTime} secs)</Text></HStack>
          </Box>
        ))
      }
    </>
  )
}

interface ReportsProps {
  finishedTimers: Timer[]
}

interface Timer {
  taskName: string,
  timers: number,
  duration: number
}

interface FinishedTasksMetadata {
  [key: string]: {
    totalTime: number,
    timersCount: number
  }
}
