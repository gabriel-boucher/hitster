import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StateProvider } from './utils/StateProvider.tsx';
import { initialState, reducer } from './utils/reducer.ts';

createRoot(document.getElementById('root')!)
.render(
  // <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  // </StrictMode>,
)
