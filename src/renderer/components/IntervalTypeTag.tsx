import {
  IntervalType,
  intervalTypeToString,
  INTERVAL_STATES,
} from 'renderer/util/intervalTypes'
import { Tag } from '@chakra-ui/react'

export default function IntervalTypeTag({
  intervalType,
}: IntervalTypeTagProps) {
  const colorScheme = (): string => {
    switch (intervalType) {
      case INTERVAL_STATES.work:
        return 'pink'
      case INTERVAL_STATES.break:
        return 'blue'
      default:
        return 'teal'
    }
  }

  const emoji = (): string => {
    switch (intervalType) {
      case INTERVAL_STATES.work:
        return '⚡️'
      case INTERVAL_STATES.break:
        return '☕️'
      default:
        return '🧘‍♀️'
    }
  }

  return (
    <Tag colorScheme={colorScheme()}>
      {emoji()} {intervalTypeToString(intervalType)}
    </Tag>
  )
}

interface IntervalTypeTagProps {
  intervalType: IntervalType
}
