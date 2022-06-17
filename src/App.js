import Main from './pages/Main'
import Settings from './pages/Settings'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider, Box } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Box bg="gray.300" h='100%'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
