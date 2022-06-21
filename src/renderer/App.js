import { useContext } from 'react';
import Main from './pages/Main'
import Settings from './pages/Settings'
import {
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider, Box } from '@chakra-ui/react'
import { StoreContext } from './contexts/storeContext'

function App() {
  const [storeData, _setStoreData] = useContext(StoreContext)
  
  if (!storeData) return <div>Loading....</div>
  return (
    <ChakraProvider>
      <Box bg="gray.300" h='100%' p={4} style={{ fontVariantNumeric: 'tabular-nums' }}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
