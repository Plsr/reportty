import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Center } from '@chakra-ui/react'
import { useContext } from 'react'
import SettingsForm from '../components/SettingsForm'
import { StoreContext } from '../contexts/storeContext'

export default function Settings() {
  const { storeData, setStoreData } = useContext(StoreContext)

  const handleFormSave = async (
    workTime: number,
    breakTime: number,
    longBreakTime: number
  ) => {
    setStoreData({ ...storeData, workTime, breakTime, longBreakTime })
  }

  return (
    <Flex h="100%" direction="column">
      <Link to="/">
        <Flex align="center">
          <ArrowBackIcon /> Back
        </Flex>
      </Link>
      <Center h="100%" minW="30%" maxW="60%" mx="auto">
        <SettingsForm onSave={handleFormSave} />
      </Center>
    </Flex>
  )
}
