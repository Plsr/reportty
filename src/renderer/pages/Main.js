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
  const [storeData, _setStoreData] = useContext(StoreContext)
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
    return intervalType === INTERVAL_STATES.work ? INTERVAL_STATES.break : INTERVAL_STATES.work
  }

  const intervalLenght = (interval = intervalType) => {
    return interval === INTERVAL_STATES.work ? storeData.workTime * 60 : storeData.breakTime * 60
  }

  const handleTimerDone = () => {
    setTimerRunning(false)
    intervalOverNotification({
      intervalType: intervalType,
      nextIntervalDuration: intervalLenght(nextIntervalType())
    })
    setIntervalType(nextIntervalType())
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
