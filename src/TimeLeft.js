import { useEffect, useState } from 'react'

export default function TimeLeft({ countdownDate, onTimerDone }) {
  const calculateTimeLeft = () => {
    const diff = +countdownDate - +new Date()
    return Math.floor((diff / 1000) % 60)
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeLeft = calculateTimeLeft()
      setTimeLeft(timeLeft)

      calculateTimeLeft()
      if (timeLeft <= 0) onTimerDone()
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div>{ timeLeft }</div>
  )
}
