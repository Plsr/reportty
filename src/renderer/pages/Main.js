import { useState, useContext, useEffect } from 'react'
import TimeLeft from '../components/TimeLeft'
import { Center, Button, VStack, Flex, Box, Text, Input, HStack } from '@chakra-ui/react'
import { INTERVAL_STATES } from '../util/intervalTypes'
import useNotification from '../hooks/useNotificaion'
import { Link } from "react-router-dom";
import { SettingsIcon } from '@chakra-ui/icons';
import { StoreContext } from '../contexts/storeContext'
import { secondsToMinutes } from '../util/timeCalculations'
import Reports from '../components/Reports'

export default function Main() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalType, setIntervalType] = useState(INTERVAL_STATES.work)
  const [currentTaskName, setCurrentTaskName] = useState('')
  const [storeData, setStoreData] = useContext(StoreContext)

  useEffect(() => {
    setIntervalType(nextIntervalType(storeData.lastIntervalType))
  }, [storeData])

  // TODO: For later
  const handleNotificationClick = () => {
    console.log("Handling the thing")
  }

  const [intervalOverNotification] = useNotification(handleNotificationClick)

  const startTimer = () => {
    setTimerRunning(true)
  }

  const stopTimer = () => {
    setTimerRunning(false)
    setIntervalType(nextIntervalType())
  }

  const nextIntervalType = (lastIntervalType) => {
    return lastIntervalType === INTERVAL_STATES.work ? getBreakType() : INTERVAL_STATES.work
  }

  const getBreakType = () => {
    return storeData.finishedTimers.timers?.length % 4 === 0 ? INTERVAL_STATES.longBreak : INTERVAL_STATES.break
  }

  const intervalLenght = (interval = intervalType) => {
    return storeData[`${interval}Time`] * 60
  }

  const currentIsWorkInterval = () => {
    return intervalType === INTERVAL_STATES.work
  }

  const handleTimerDone = () => {
    setTimerRunning(false)
    intervalOverNotification({
      intervalType: intervalType,
      nextIntervalDuration: intervalLenght(nextIntervalType())
    })
    updateFinishedTimersCount()
  }

  updateFinishedTimersCount = () => {
    const updatedStore = {
      lastIntervalType: intervalType
    }

    if (currentIsWorkInterval()) {
      const newFinishedCount = storeData.finishedTimers.finishedCount += 1
      const newFinishedTimers = {
        currentDate: new Date().toISOString(),
        timers: [
          ...(storeData.finishedTimers.timers ? storeData.finishedTimers.timers : []), 
          { duration: intervalLenght(), taskName: currentTaskName || 'no task added'}
        ],
      }
      updatedStore.finishedTimers = { ...newFinishedTimers }
      window.electron.ipcRenderer.setStoreValue('finishedTimers', newFinishedTimers)
    }

    setStoreData({...storeData, ...updatedStore })
    window.electron.ipcRenderer.setStoreValue('lastIntervalType', updatedStore.lastIntervalType)
  }

  return (
    <Flex direction="column" h="100%">
      <Box ml="auto">
        <Link to='/settings'> <SettingsIcon w="6" h="6" /></Link>
      </Box>
      <Center bg="gray.300" h='100%'>
        <VStack>
          { !timerRunning && (
            <VStack>
              <Text fontSize='5xl'>{ secondsToMinutes(intervalLenght(intervalType)) }</Text>
              <Input value={currentTaskName} onChange={e => setCurrentTaskName(e.target.value)} placeholder="What are you working on?"></Input>
              <Button size="sm" colorScheme="blue" variant="outline" onClick={startTimer}>Start timer</Button>
            </VStack>
          )}
          { timerRunning && (
            <VStack>
              <TimeLeft countdownSeconds={intervalLenght()} onTimerDone={handleTimerDone} />
              <Button size="sm" colorScheme="red" variant="ghost" onClick={stopTimer}>abort timer</Button>
            </VStack>
          )}
          { (storeData.finishedTimers?.timers?.length > 0) && (
            <Reports finishedTimers={storeData.finishedTimers.timers} />
          )}
        </VStack>
      </Center>
    </Flex>
  );
}
