import Main from './pages/Main'
import Settings from './pages/Settings'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider, Box } from '@chakra-ui/react'
import { StoreProvider } from './contexts/storeContext'

function App() {

  return (
    <StoreProvider>
      <ChakraProvider>
        <Box bg="gray.300" h='100%' p={4} style={{ fontVariantNumeric: 'tabular-nums' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
