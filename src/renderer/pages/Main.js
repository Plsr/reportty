import { useState, useContext } from 'react'
import TimeLeft from '../components/TimeLeft'
import { Center, Button, VStack, Flex, Box, Text } from '@chakra-ui/react'
import { INTERVAL_STATES } from '../util/intervalTypes'
import useNotification from '../hooks/useNotificaion'
import { Link } from "react-router-dom";
import { SettingsIcon } from '@chakra-ui/icons';
import { StoreContext } from '../contexts/storeContext'
import { secondsToMinutes } from '../util/timeCalculations'

export default function Main() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalType, setIntervalType] = useState(INTERVAL_STATES.work)
  const [storeData, setStoreData] = useContext(StoreContext)
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

  const nextIntervalType = () => {
    return intervalType === INTERVAL_STATES.work ? getBreakType() : INTERVAL_STATES.work
  }

  const getBreakType = () => {
    return storeData.finishedTimers.finishedCount % 4 === 0 ? INTERVAL_STATES.longBreak : INTERVAL_STATES.break
  }

  const intervalLenght = (interval = intervalType) => {
    return storeData[`${interval}Time`] 
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
    if (currentIsWorkInterval()) {
      updateFinishedTimersCount()
    }
    setIntervalType(nextIntervalType())

  }

  updateFinishedTimersCount = () => {
    const newFinishedCount = storeData.finishedTimers.finishedCount += 1
    const newFinishedTimers = {
      finishedCount: newFinishedCount,
      date: new Date().toISOString()
    }
    setStoreData({...storeData, finishedTimers: newFinishedTimers})
    window.electron.ipcRenderer.setStoreValue('finishedTimers.finishedCount', newFinishedCount)
  }

  return (
    <Flex direction="column" h="100%">
      <Box ml="auto">
        <Link to='/settings'> <SettingsIcon w="6" h="6" /></Link>
      </Box>
      <Center bg="gray.300" h='100%'>
        { !timerRunning && (
          <VStack>
            <Text fontSize='5xl'>{ secondsToMinutes(intervalLenght(intervalType)) }</Text>
            <Button size="sm" colorScheme="blue" variant="outline" onClick={startTimer}>Start timer</Button>
          </VStack>
        )}
        { timerRunning && (
          <VStack>
            <TimeLeft countdownSeconds={intervalLenght()} onTimerDone={handleTimerDone} />
            <Button size="sm" colorScheme="red" variant="ghost" onClick={stopTimer}>abort timer</Button>
          </VStack>
        )}
      </Center>
    </Flex>
  );
}
