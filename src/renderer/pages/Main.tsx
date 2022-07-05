import { useState, useContext, useEffect } from 'react'
import {
  Center,
  Button,
  VStack,
  Text,
  Flex,
  Box,
  Input,
  Tag,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { add, differenceInSeconds } from 'date-fns'
import { SettingsIcon } from '@chakra-ui/icons'
import TimeLeft from '../components/TimeLeft'
import { INTERVAL_STATES, IntervalType } from '../util/intervalTypes'
import useNotification from '../hooks/useNotificaion'
import { StoreContext } from '../contexts/storeContext'
import { secondsToMinutes } from '../util/timeCalculations'
import { FinishedTimer, FinishedTimers } from '../../main/storeSchema'
import Reports from '../components/Reports'
import Card from '../components/Card'

export default function Main() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [currentTimerEndDate, setCurrentTimerEndDate] = useState<Date>()
  const [secondsLeft, setSecondsLeft] = useState<number>(0)
  const [intervalType, setIntervalType] = useState<IntervalType>(
    INTERVAL_STATES.work as IntervalType
  )
  const [currentTaskName, setCurrentTaskName] = useState('')
  const { storeData, setStoreData } = useContext(StoreContext)

  useEffect(() => {
    setIntervalType(nextIntervalType(storeData.lastIntervalType))
  }, [storeData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.electron.ipcRenderer.onWindowBecameActive(() => {
      setSecondsLeft(
        differenceInSeconds(currentTimerEndDate as Date, new Date())
      )
    })
  }, [currentTimerEndDate])

  // TODO: For later
  const handleNotificationClick = () => {
    console.log('Handling the thing')
  }

  const [intervalOverNotification] = useNotification(handleNotificationClick)

  const startTimer = () => {
    const timerEndDate = add(new Date(), { seconds: intervalLenght() })
    setCurrentTimerEndDate(timerEndDate)
    setSecondsLeft(differenceInSeconds(timerEndDate, new Date()))
    setTimerRunning(true)
  }

  const stopTimer = () => {
    setTimerRunning(false)
    setIntervalType(nextIntervalType())
  }

  const nextIntervalType = (lastIntervalType?: string): IntervalType => {
    return (
      lastIntervalType === INTERVAL_STATES.work
        ? getBreakType()
        : INTERVAL_STATES.work
    ) as IntervalType
  }

  const getBreakType = () => {
    return storeData.finishedTimers.timers?.length % 4 === 0
      ? INTERVAL_STATES.longBreak
      : INTERVAL_STATES.break
  }

  const intervalLenght = (interval: IntervalType = intervalType) => {
    return storeData[`${interval}Time`] * 60
  }

  const currentIsWorkInterval = () => {
    return intervalType === INTERVAL_STATES.work
  }

  const updateFinishedTimersCount = () => {
    const updatedStore: UpdateStore = {
      lastIntervalType: intervalType,
    }

    if (currentIsWorkInterval()) {
      const newFinishedTimers: FinishedTimers = {
        currentDate: new Date().toISOString(),
        timers: [
          ...(storeData.finishedTimers.timers
            ? storeData.finishedTimers.timers
            : []),
          {
            duration: intervalLenght(),
            taskName: currentTaskName || 'no task added',
          },
        ] as FinishedTimer[],
      }
      updatedStore.finishedTimers = newFinishedTimers
      window.electron.ipcRenderer.setStoreValue(
        'finishedTimers',
        newFinishedTimers
      )
    }

    setStoreData({ ...storeData, ...updatedStore })
    window.electron.ipcRenderer.setStoreValue(
      'lastIntervalType',
      updatedStore.lastIntervalType
    )
  }

  const handleTimerDone = () => {
    setTimerRunning(false)
    intervalOverNotification({
      intervalType,
      nextIntervalDuration: intervalLenght(nextIntervalType()),
    })
    updateFinishedTimersCount()
  }

  return (
    <Flex direction="column" h="100%">
      <Box ml="auto">
        <Link to="/settings">
          {' '}
          <SettingsIcon w="6" h="6" />
        </Link>
      </Box>
      <Center h="100%">
        <VStack spacing={8}>
          {!timerRunning && (
            <Card spacious>
              <VStack>
                <Tag colorScheme="blue">{intervalType}</Tag>
                <Text fontSize="5xl">
                  {secondsToMinutes(intervalLenght(intervalType))}
                </Text>
                <Input
                  value={currentTaskName}
                  onChange={(e) => setCurrentTaskName(e.target.value)}
                  placeholder="What are you working on?"
                />
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={startTimer}
                >
                  Start timer
                </Button>
              </VStack>
            </Card>
          )}
          {timerRunning && (
            <VStack>
              <TimeLeft
                countdownSeconds={secondsLeft}
                onTimerDone={handleTimerDone}
              />
              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={stopTimer}
              >
                abort timer
              </Button>
            </VStack>
          )}
          {storeData.finishedTimers?.timers?.length > 0 && (
            <Reports finishedTimers={storeData.finishedTimers.timers} />
          )}
        </VStack>
      </Center>
    </Flex>
  )
}

interface UpdateStore {
  lastIntervalType: IntervalType
  finishedTimers?: {
    currentDate: string
    timers: FinishedTimer[]
  }
}
