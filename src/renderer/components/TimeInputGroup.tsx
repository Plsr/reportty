import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Input,
} from '@chakra-ui/react'

export default function TimeInputGroup({ value, onValueChange, title }: Props) {
  const handleValueChange = (newValue: string | number) => {
    onValueChange(+newValue)
  }

  return (
    <>
      <Text fontSize="m" fontWeight="bold" mb={4}>
        {title}
      </Text>
      <Box mb={2}>
        <Input
          display="inline-block"
          width="auto"
          mr={2}
          htmlSize={3}
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
        />
        <Text fontSize="l" display="inline">
          Minutes
        </Text>
      </Box>
      <Slider
        min={1}
        max={120}
        step={1}
        colorScheme="teal"
        value={value}
        defaultValue={value}
        onChange={(newValue) => handleValueChange(newValue)}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </>
  )
}

interface Props {
  value: number
  onValueChange(value: number): void
  title: string
}
