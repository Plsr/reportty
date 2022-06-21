import { createRoot } from 'react-dom/client';
import App from './App';
import { HashRouter } from "react-router-dom";
import { StoreProvider } from './contexts/storeContext'

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <StoreProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StoreProvider>
);
