import { Text, Box, VStack, Flex } from '@chakra-ui/react'
import { TimeIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { FinishedTimer } from 'main/storeSchema'
import Card from './Card'

export default function Reports({ finishedTimers }: ReportsProps) {
  const finishedTimersByTaskName = (): FinishedTasksMetadata => {
    if (finishedTimers.length < 1) return {}
    const finishedTasksMetadata: FinishedTasksMetadata = {}
    finishedTimers.forEach((timer) => {
      const currentTaskName = timer.taskName
      const presentData = finishedTasksMetadata[currentTaskName]

      finishedTasksMetadata[currentTaskName] = {
        totalTime: (presentData?.totalTime || 0) + timer.duration,
        timersCount: (presentData?.timersCount || 0) + 1,
      }
    })

    return finishedTasksMetadata
  }

  return (
    <Box width="100%">
      <Text color="purple.700" fontSize="md" fontWeight={600}>
        <RepeatClockIcon /> Finished Intervals ({finishedTimers.length} total)
      </Text>
      <Flex flexDirection="column" width="100%" mt={4}>
        {Object.entries(finishedTimersByTaskName()).map(([taskName, data]) => (
          <Box mb={4} key={taskName}>
            <Card>
              <VStack spacing={0} alignItems="start">
                <Text fontSize="xs" color="gray.500">
                  <TimeIcon /> {data.timersCount} ({data.totalTime} secs)
                </Text>
                <Text fontSize="md" fontWeight={600}>
                  {taskName}
                </Text>
              </VStack>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

interface ReportsProps {
  finishedTimers: FinishedTimer[]
}

interface FinishedTasksMetadata {
  [key: string]: {
    totalTime: number
    timersCount: number
  }
}
