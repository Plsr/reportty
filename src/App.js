import { useState } from 'react'
import TimeLeft from './components/TimeLeft'
import { Center, Button, VStack } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [timerRunning, setTimerRunning] = useState(false)

  const startTimer = () => {
    setTimerRunning(true)
  }

  const stopTimer = () => {
    setTimerRunning(false)
  }

  const handleTimerDone = () => {
    setTimerRunning(false)
  }

  return (
    <ChakraProvider>
      <Center bg="gray.300" h={'100vh'}>
        { !timerRunning && (
          <Button colorScheme="blue" onClick={startTimer}>Start timer</Button>
        )}
        { timerRunning && (
          <VStack>
            <TimeLeft countdownSeconds={10} onTimerDone={handleTimerDone} />
            <Button size="xs" colorScheme="red" variant="ghost" onClick={stopTimer}>abort timer</Button>
          </VStack>
        )}
      </Center>
    </ChakraProvider>
  );
}

export default App;
