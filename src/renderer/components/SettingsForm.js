import { useContext, useState } from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Input,
  Button
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import TimeInputGroup from './TimeInputGroup'
import { StoreContext } from 'renderer/contexts/storeContext'

export default function SettingsForm({ onSave }) {
  const [storeData, _setStoreData] = useContext(StoreContext)
  const [workTime, setWorkTime] = useState(storeData.workTime)
  const [breakTime, setBreakTime] = useState(storeData.breakTime)
  const [longBreakTime, setLongBreakTime] = useState(storeData.longBreakTime)
  const [showButtonSuccessState, setShowButtonSuccessState] = useState(false)

  const handleFormSave = () => {
    onSave({ workTime, breakTime, longBreakTime})
    setShowButtonSuccessState(true)
    setTimeout(() => {
      setShowButtonSuccessState(false)
    }, 2000)
  }

  return (
    <Box w="100%">
      <Box mb="8">
        <TimeInputGroup title="Work interval length" value={workTime} onValueChange={(v) => setWorkTime(+v)} />
      </Box>
      <Box mb="8">
      <TimeInputGroup title="Break length" value={breakTime} onValueChange={(v) => setBreakTime(+v)} />
      </Box>
      <Box mb="8">
        <TimeInputGroup title="Long break length" value={longBreakTime} onValueChange={(v) => setLongBreakTime(+v)} />
      </Box>
      <Button onClick={handleFormSave} colorScheme="teal" mt={4}>
        { showButtonSuccessState && (
          <>
            <CheckIcon w="3" h="3" mr="2"/> Saved
          </>
        )} 
        { !showButtonSuccessState && "Save" }
      </Button>
    </Box>
  )
}
