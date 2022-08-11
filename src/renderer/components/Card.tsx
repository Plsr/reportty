import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

export default function Card({ children, spacious }: Props) {
  return (
    <Box
      backgroundColor="white"
      p={spacious ? 8 : 3}
      borderRadius={8}
      boxShadow="xl"
      w="350px"
    >
      {children}
    </Box>
  )
}

Card.defaultProps = {
  spacious: false,
}

interface Props {
  children: ReactNode
  spacious?: boolean
}
