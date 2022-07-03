import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Main from './pages/Main'
import Settings from './pages/Settings'
import { StoreContext } from './contexts/storeContext'

function App() {
  const { storeData } = useContext(StoreContext)

  if (!storeData) return <div>Loading....</div>
  return (
    <ChakraProvider>
      <Box
        bg="gray.100"
        h="100%"
        p={4}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}

export default App
