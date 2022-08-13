import { VStack, HStack, Text, Button, Input } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { secondsToMinutes } from 'renderer/util/timeCalculations'
import { useState } from 'react'
import { IntervalType, INTERVAL_STATES } from 'renderer/util/intervalTypes'
import Card from './Card'
import IntervalTypeTag from './IntervalTypeTag'

export default function TimerReady({
  intervalType,
  intervalLength,
  onStartButtonClick,
  onSkipButtonClick,
}: TimeReadyProps) {
  const [currentTaskName, setCurrentTaskName] = useState('')

  const handleStartButtonClick = () => {
    onStartButtonClick(currentTaskName)
  }

  const handleSkipButtonClick = () => {
    onSkipButtonClick()
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
        <HStack>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleStartButtonClick}
          >
            {buttonText}
          </Button>
          <Button
            size="sm"
            colorScheme="pink"
            variant="outline"
            onClick={handleSkipButtonClick}
          >
            <ArrowRightIcon w={2} mr={2} /> Skip Interval
          </Button>
        </HStack>
      </VStack>
    </Card>
  )
}

interface TimeReadyProps {
  intervalType: IntervalType
  intervalLength: number
  onStartButtonClick: (taksName: string) => void
  onSkipButtonClick: () => void
}
