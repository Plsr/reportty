import { useState } from 'react'
import TimeLeft from './components/TimeLeft'
import { Center, Button, VStack } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const WORK_INTERVAL_LENGTH_SEC = 10
const BREAK_LENGTH_SEC = 5

const INTERVAL_STATES = {
  work: 'work',
  break: 'break'
}

function App() {
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalType, setIntervalType] = useState(INTERVAL_STATES.work)

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

  const intervalLenght = () => {
    return intervalType === INTERVAL_STATES.work ? WORK_INTERVAL_LENGTH_SEC : BREAK_LENGTH_SEC
  }


  const handleTimerDone = () => {
    setTimerRunning(false)
    setIntervalType(nextIntervalType())
  }

  return (
    <ChakraProvider>
      <Center bg="gray.300" h={'100vh'}>
        { !timerRunning && (
          <Button colorScheme="blue" onClick={startTimer}>Start timer</Button>
        )}
        { timerRunning && (
          <VStack>
            <TimeLeft countdownSeconds={intervalLenght()} onTimerDone={handleTimerDone} />
            <Button size="xs" colorScheme="red" variant="ghost" onClick={stopTimer}>abort timer</Button>
          </VStack>
        )}
      </Center>
    </ChakraProvider>
  );
}

export default App;
