import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Center } from '@chakra-ui/react'

export default function Settings() {
  const storeSetTest = async () => {
    console.log(await window.electronApi.getStoreValue('foo'))
    console.log(window.electronApi)
    window.electronApi.setStoreValue('foo', 'test')
  }

  return (
    <Flex h="100%" direction="column">
      <Link to='/'><Flex align="center"><ArrowBackIcon /> Back</Flex></Link>
      <Center h="100%">
        <div>Here be Settings</div>
        <button onClick={storeSetTest}>Set test</button>
      </Center>
    </Flex>
  )
}
