import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Center } from '@chakra-ui/react'
import SettingsForm from '../components/SettingsForm'
import { StoreContext } from '../contexts/storeContext'
import { useContext } from 'react'

export default function Settings() {
  const [storeData, setStoreData] = useContext(StoreContext)

  const storeSetTest = async () => {
    console.log(await window.electron.ipcRenderer.getStoreValue('foo'))
    console.log(window.electron.ipcRenderer)
    window.electron.ipcRenderer.setStoreValue('foo', 'test')
  }

  // TODO: Handle case if store write fails (needs to be added to method in preload.js)
  const handleFormSave = async ({ workTime, breakTime, longBreakTime }) => {
    setStoreData({ ...storeData, workTime, breakTime, longBreakTime })
    const storeWorkTime = window.electron.ipcRenderer.setStoreValue('workTime', workTime)
    const storeBreakTime = window.electron.ipcRenderer.setStoreValue('breakTime', breakTime)
    const storeLongBreakTime = window.electron.ipcRenderer.setStoreValue('longBreakTime', longBreakTime)
    const results = await Promise.all([storeWorkTime, storeBreakTime, storeLongBreakTime])
  }

  return (
    <Flex h="100%" direction="column">
      <Link to='/'><Flex align="center"><ArrowBackIcon /> Back</Flex></Link>
      <Center h="100%" minW="30%" maxW="60%" mx="auto">
        <SettingsForm onSave={handleFormSave} />
      </Center>
    </Flex>
  )
}
