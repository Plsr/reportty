import { VStack, HStack, Button, Text, Tooltip } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { IntervalType, INTERVAL_STATES } from 'renderer/util/intervalTypes'
import { secondsToMinutes } from 'renderer/util/timeCalculations'
import Card from './Card'

export default function TimerRunning({
  countdownSeconds,
  intervalType,
  onTimerDone,
  onStopClick,
}: TimerRunningProps) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds)

  useEffect(() => {
    const timer = setTimeout(() => {
      const left = timeLeft - 1
      setTimeLeft(left)

      if (left <= 0) onTimerDone()
    }, 1000)

    return () => clearTimeout(timer)
  })

  const handleFinishClick = () => {
    onStopClick('finish', timeLeft)
  }

  const handleAbortClick = () => {
    onStopClick('abort', timeLeft)
  }

  const isWorkTimer = intervalType === INTERVAL_STATES.work

  return (
    <Card spacious>
      <VStack>
        <Text fontSize="5xl">{secondsToMinutes(timeLeft)}</Text>
        <HStack>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={handleAbortClick}
          >
            abort timer
          </Button>
          {isWorkTimer && (
            <Tooltip
              hasArrow
              label="This will save the time you already worked to the reports"
            >
              <Button size="sm" colorScheme="blue" onClick={handleFinishClick}>
                finish & save
              </Button>
            </Tooltip>
          )}
        </HStack>
      </VStack>
    </Card>
  )
}

interface TimerRunningProps {
  countdownSeconds: number
  intervalType: IntervalType
  onTimerDone: () => void
  onStopClick: (reason: AbortReason, timeLeft: number) => void
}

export type AbortReason = 'finish' | 'abort'
