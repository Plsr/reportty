import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

export default function Card({ children, spacious = false }: Props) {
  return (
    <Box
      backgroundColor="white"
      p={spacious ? 8 : 3}
      borderRadius={8}
      boxShadow="xl"
    >
      {children}
    </Box>
  )
}

interface Props {
  children: ReactNode
  spacious: boolean
}
