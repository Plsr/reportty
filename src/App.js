import { useState } from 'react'
import TimeLeft from './TimeLeft'

function App() {
  const [timerRunning, setTimerRunning] = useState(false)

  const startTimer = () => {
    setTimerRunning(true)
  }

  const setCountdownDate = () => {
    const now = new Date()
    return now.setMinutes(now.getMinutes() + 1)
  }

  const handleTimerDone = () => {
    setTimerRunning(false)
  }

  return (
    <div>
      { !timerRunning && (
        <button onClick={startTimer}>Start timer</button>
      )}
      { timerRunning && (
        <TimeLeft countdownDate={setCountdownDate()} onTimerDone={handleTimerDone} />
      )}
    </div>
  );
}

export default App;
