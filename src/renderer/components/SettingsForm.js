import { useState } from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Input
} from '@chakra-ui/react'
import TimeInputGroup from './TimeInputGroup'

export default function SettingsForm() {
  const [workIntervalLength, setWorkIntervalLength] = useState(25)
  return (
    <Box w="100%">
      <TimeInputGroup value={workIntervalLength} onValueChange={(v) => setWorkIntervalLength(v)} />
    </Box>
  )
}
