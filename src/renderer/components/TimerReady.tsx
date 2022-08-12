import { VStack, Text, Button, Input } from '@chakra-ui/react'
import { secondsToMinutes } from 'renderer/util/timeCalculations'
import { useState } from 'react'
import { IntervalType, INTERVAL_STATES } from 'renderer/util/intervalTypes'
import Card from './Card'
import IntervalTypeTag from './IntervalTypeTag'

export default function TimerReady({
  intervalType,
  intervalLength,
  onStartButtonClick,
}: TimeReadyProps) {
  const [currentTaskName, setCurrentTaskName] = useState('')

  const handleStartButtonClick = () => {
    onStartButtonClick(currentTaskName)
  }

  const isWorkInterval = intervalType === INTERVAL_STATES.work
  const buttonText = isWorkInterval ? 'Start working' : 'Start break'

  return (
    <Card spacious>
      <VStack spacing={3}>
        <IntervalTypeTag intervalType={intervalType} />
        <Text fontSize="5xl">{secondsToMinutes(intervalLength)}</Text>
        {isWorkInterval && (
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
          {buttonText}
        </Button>
      </VStack>
    </Card>
  )
}

interface TimeReadyProps {
  intervalType: IntervalType
  intervalLength: number
  onStartButtonClick: (taksName: string) => void
}
