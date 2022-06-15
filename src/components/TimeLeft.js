import { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'

export default function TimeLeft({ countdownSeconds, onTimerDone }) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds)

  useEffect(() => {
    const timer = setTimeout(() => {
      const left = timeLeft - 1
      setTimeLeft(left)

      if (left <= 0) onTimerDone()
    }, 1000)

    return () => clearTimeout(timer)
  })

  if (timeLeft <= 0) return null

  return (
    <Text fontSize='5xl'>{ timeLeft }</Text>
  )
}
