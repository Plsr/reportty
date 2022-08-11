import { useState, useContext, useEffect } from 'react'
import { Center, Button, VStack, Flex, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { SettingsIcon } from '@chakra-ui/icons'
import TimerReady from 'renderer/components/TimerReady'
import TimeLeft from '../components/TimeLeft'
import { INTERVAL_STATES, IntervalType } from '../util/intervalTypes'
import useNotification from '../hooks/useNotificaion'
import { StoreContext } from '../contexts/storeContext'
import { FinishedTimer, FinishedTimers } from '../../main/storeSchema'
import Reports from '../components/Reports'

export default function Main() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalType, setIntervalType] = useState<IntervalType>(
    INTERVAL_STATES.work as IntervalType
  )
  const [currentTaskName, setCurrentTaskName] = useState('')
  const { storeData, setStoreData } = useContext(StoreContext)

  useEffect(() => {
    setIntervalType(nextIntervalType(storeData.lastIntervalType))
  }, [storeData]) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: For later
  const handleNotificationClick = () => {
    console.log('Handling the thing')
  }

  const [intervalOverNotification] = useNotification(handleNotificationClick)

  const startTimer = (taskName: string) => {
    setCurrentTaskName(taskName)
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
          <SettingsIcon w="6" h="6" />
        </Link>
      </Box>
      <Center h="100%">
        <VStack spacing={8}>
          {!timerRunning && (
            <TimerReady
              intervalType={intervalType}
              intervalLength={intervalLenght(intervalType)}
              onStartButtonClick={startTimer}
            />
          )}
          {timerRunning && (
            <VStack>
              <TimeLeft
                countdownSeconds={intervalLenght()}
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
