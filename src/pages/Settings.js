import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

export default function Settings() {
  return (
    <>
      <Link to='/'><Flex align="center"><ArrowBackIcon /> Back</Flex></Link>
      <div>Settings</div>
    </>
  )
}
