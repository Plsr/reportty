import { useState } from 'react'
import TimeLeft from '../components/TimeLeft'
import { Center, Button, VStack, Flex, Box, Text } from '@chakra-ui/react'
import { INTERVAL_STATES } from '../util/intervalTypes'
import useNotification from '../hooks/useNotificaion'
import { Link } from "react-router-dom";
import { SettingsIcon } from '@chakra-ui/icons';

const WORK_INTERVAL_LENGTH_SEC = 10
const BREAK_LENGTH_SEC = 5

export default function Main() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalType, setIntervalType] = useState(INTERVAL_STATES.work)
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
    return interval === INTERVAL_STATES.work ? WORK_INTERVAL_LENGTH_SEC : BREAK_LENGTH_SEC
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
    <Flex direction="column" h="100%" p={4}>
      <Box ml="auto">
        <Link to='/settings'> <SettingsIcon w="6" h="6" /></Link>
      </Box>
      <Center bg="gray.300" h='100%'>
        { !timerRunning && (
          <VStack>
            <Text fontSize='5xl'>{ intervalLenght(intervalType) }</Text>
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
