import { VStack, Tag, Text, Button, Input } from '@chakra-ui/react'
import { secondsToMinutes } from 'renderer/util/timeCalculations'
import { useState } from 'react'
import { INTERVAL_STATES } from 'renderer/util/intervalTypes'
import Card from './Card'

export default function TimerReady({
  intervalType,
  intervalLength,
  onStartButtonClick,
}: TimeReadyProps) {
  const [currentTaskName, setCurrentTaskName] = useState('')

  const handleStartButtonClick = () => {
    onStartButtonClick(currentTaskName)
  }

  const shouldShowInput = intervalType === INTERVAL_STATES.work

  return (
    <Card spacious>
      <VStack>
        <Tag colorScheme="blue">{intervalType}</Tag>
        <Text fontSize="5xl">{secondsToMinutes(intervalLength)}</Text>
        {shouldShowInput && (
          <Input
            value={currentTaskName}
            onChange={(e) => setCurrentTaskName(e.target.value)}
            placeholder="What are you working on?"
          />
        )}

        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={handleStartButtonClick}
        >
          Start timer
        </Button>
      </VStack>
    </Card>
  )
}

interface TimeReadyProps {
  intervalType: string
  intervalLength: number
  onStartButtonClick: (taksName: string) => void
}
